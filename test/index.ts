/**
 * @akaoio/builder test suite using @akaoio/battle
 * All tests use real PTY emulation for maximum accuracy
 */
import { Battle } from "@akaoio/battle"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { dirname } from "node:path"
import { mkdirSync, writeFileSync } from "node:fs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

// Create test fixtures
function setupFixtures() {
  mkdirSync(join(projectRoot, 'test/fixtures'), { recursive: true })
  mkdirSync(join(projectRoot, 'tmp'), { recursive: true })

  writeFileSync(
    join(projectRoot, 'test/fixtures/simple.ts'),
    `export function hello(name: string): string {
  return \`Hello, \${name}!\`
}

export const version = '1.0.0'
`
  )

  writeFileSync(
    join(projectRoot, 'test/fixtures/node-app.ts'),
    `import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function readConfig(path: string): any {
  const content = readFileSync(join(process.cwd(), path), 'utf-8')
  return JSON.parse(content)
}

console.log('Node.js application')
`
  )

  writeFileSync(
    join(projectRoot, 'test/fixtures/browser.ts'),
    `export class DOMHelper {
  static createElement(tag: string): HTMLElement {
    return document.createElement(tag)
  }

  static querySelector(selector: string): Element | null {
    return document.querySelector(selector)
  }
}

export function ready(callback: () => void): void {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}
`
  )
}

async function runTests() {
  console.log('🚀 @akaoio/builder Test Suite (Powered by @akaoio/battle)\n')

  // Setup fixtures
  setupFixtures()

  const tests = [
    // CLI Tests
    {
      name: 'CLI: Help',
      command: 'node',
      args: ['dist/cli.js', '--help'],
      expect: ['Universal TypeScript build tool', 'Options:', '--entry', '--format']
    },
    {
      name: 'CLI: Build Simple Project',
      command: 'node',
      args: ['dist/cli.js', '--entry', 'test/fixtures/simple.ts', '--out-dir', 'tmp/simple-build', '--clean', '--no-dts'],
      expect: ['Building...', 'Build success']
    },
    {
      name: 'CLI: Library Preset',
      command: 'node',
      args: ['dist/cli.js', '--entry', 'test/fixtures/simple.ts', '--target', 'library', '--out-dir', 'tmp/library-build', '--clean', '--no-dts'],
      expect: ['Building...', 'Build success']
    },
    {
      name: 'CLI: Multiple Formats',
      command: 'node',
      args: ['dist/cli.js', '--entry', 'test/fixtures/simple.ts', '--format', 'cjs', 'esm', '--out-dir', 'tmp/multi-format', '--clean', '--no-dts'],
      expect: ['Building...', 'Build success']
    },
    {
      name: 'CLI: Verbose Output',
      command: 'node',
      args: ['dist/cli.js', '--entry', 'test/fixtures/simple.ts', '--out-dir', 'tmp/verbose-build', '--verbose', '--clean', '--no-dts'],
      expect: ['Building...', 'Output files:', 'Build completed']
    },
    {
      name: 'CLI: Invalid Entry',
      command: 'node',
      args: ['dist/cli.js', '--entry', 'non-existent.ts'],
      expect: ['Error:', 'Entry point does not exist']
    },
    {
      name: 'CLI: Node Target',
      command: 'node',
      args: ['dist/cli.js', '--entry', 'test/fixtures/node-app.ts', '--target', 'node', '--out-dir', 'tmp/node-build', '--clean', '--no-dts'],
      expect: ['Building...', 'Build success']
    },
    {
      name: 'CLI: Browser Target',
      command: 'node',
      args: ['dist/cli.js', '--entry', 'test/fixtures/browser.ts', '--target', 'browser', '--global-name', 'MyLib', '--out-dir', 'tmp/browser-build', '--clean', '--no-dts'],
      expect: ['Building...', 'Build success']
    },
    // Programmatic API Tests
    {
      name: 'API: Programmatic Usage',
      command: 'bun',
      args: ['run', 'tsx', 'test/programmatic.test.ts'],
      expect: [
        'Testing Programmatic Builder API',
        'Builder created successfully',
        'Build succeeded',
        'simple.js exists',
        'simple.cjs exists',
        'Configuration retrieved',
        'All programmatic API tests passed!'
      ]
    }
  ]

  let passed = 0
  let failed = 0

  for (const test of tests) {
    process.stdout.write(`Testing: ${test.name}... `)
    
    const battle = new Battle({
      cwd: projectRoot,
      timeout: 30000
    })

    try {
      const result = await battle.run(async (b) => {
        b.spawn(test.command, test.args || [])
        
        for (const pattern of test.expect) {
          await b.expect(pattern, 10000)
        }
      })

      if (result.success) {
        console.log('✅ PASSED')
        passed++
      } else {
        console.log('❌ FAILED')
        console.error(`  ${result.error || 'Unknown error'}`)
        failed++
      }
    } catch (error) {
      console.log('❌ FAILED')
      console.error(`  ${error instanceof Error ? error.message : error}`)
      failed++
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log(`📊 Results: ${passed} passed, ${failed} failed`)
  console.log('='.repeat(50))
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed. @akaoio/builder needs fixes.')
    process.exit(1)
  } else {
    console.log('\n✅ All tests passed! @akaoio/builder is battle-tested.')
    process.exit(0)
  }
}

// Run all tests
runTests().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})