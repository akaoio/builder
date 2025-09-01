#!/usr/bin/env node

/**
 * Battle Tests for @akaoio/builder
 * Recovered from Battle logs analysis
 */

const { Battle } = require('@akaoio/battle')
const fs = require('fs')
const path = require('path')

async function testBuilderHelp() {
  const battle = new Battle({
    name: 'builder-help-test',
    timeout: 10000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing builder --help...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--help'], {
      cwd: process.cwd()
    })
    
    await b.expect('Usage: akao-build')
    await b.expect('Universal TypeScript build tool')
    await b.expect('Options:')
    await b.expect('--entry')
    await b.expect('--format')
    
    console.log('✅ Builder help test passed')
  })
}

async function testBuilderSimpleBuild() {
  const battle = new Battle({
    name: 'builder-simple-build-test',
    timeout: 30000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing simple builder build...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--entry', 'test/fixtures/simple.ts', '--out-dir', 'tmp/simple-build', '--clean'], {
      cwd: process.cwd()
    })
    
    await b.expect('Build completed', 25000)
    
    // Check output files exist
    const outputExists = fs.existsSync(path.join(process.cwd(), 'tmp/simple-build'))
    if (!outputExists) {
      throw new Error('Build output directory not created')
    }
    
    console.log('✅ Builder simple build test passed')
  })
}

async function testBuilderLibraryTarget() {
  const battle = new Battle({
    name: 'builder-library-test',
    timeout: 30000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing builder library target...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--entry', 'test/fixtures/simple.ts', '--target', 'library', '--out-dir', 'tmp/library-build', '--clean'], {
      cwd: process.cwd()
    })
    
    await b.expect('Build completed', 25000)
    
    console.log('✅ Builder library target test passed')
  })
}

async function testBuilderMultiFormat() {
  const battle = new Battle({
    name: 'builder-multi-format-test',
    timeout: 30000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing builder multi-format output...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--entry', 'test/fixtures/simple.ts', '--format', 'cjs', 'esm', '--out-dir', 'tmp/multi-format', '--clean'], {
      cwd: process.cwd()
    })
    
    await b.expect('Build completed', 25000)
    
    console.log('✅ Builder multi-format test passed')
  })
}

async function testBuilderVerbose() {
  const battle = new Battle({
    name: 'builder-verbose-test',
    timeout: 30000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing builder verbose output...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--entry', 'test/fixtures/simple.ts', '--out-dir', 'tmp/verbose-build', '--verbose', '--clean'], {
      cwd: process.cwd()
    })
    
    await b.expect('Build completed', 25000)
    
    console.log('✅ Builder verbose test passed')
  })
}

async function testBuilderNonExistentEntry() {
  const battle = new Battle({
    name: 'builder-error-test',
    timeout: 10000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing builder with non-existent entry...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--entry', 'non-existent.ts'], {
      cwd: process.cwd()
    })
    
    // Should fail with error
    await b.expect('Error', 5000)
    
    console.log('✅ Builder error handling test passed')
  })
}

async function testBuilderNodeTarget() {
  const battle = new Battle({
    name: 'builder-node-target-test',
    timeout: 30000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing builder node target...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--entry', 'test/fixtures/node-app.ts', '--target', 'node', '--out-dir', 'tmp/node-build', '--clean'], {
      cwd: process.cwd()
    })
    
    await b.expect('Build completed', 25000)
    
    console.log('✅ Builder node target test passed')
  })
}

async function testBuilderBrowserTarget() {
  const battle = new Battle({
    name: 'builder-browser-target-test',
    timeout: 30000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing builder browser target...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--entry', 'test/fixtures/browser.ts', '--target', 'browser', '--global-name', 'MyLib', '--out-dir', 'tmp/browser-build', '--clean'], {
      cwd: process.cwd()
    })
    
    await b.expect('Build completed', 25000)
    
    console.log('✅ Builder browser target test passed')
  })
}

async function testBuilderNoDts() {
  const battle = new Battle({
    name: 'builder-no-dts-test',
    timeout: 30000
  })

  return await battle.run(async (b) => {
    console.log('🧪 Testing builder --no-dts option...')
    
    b.spawn('npx', ['tsx', 'src/cli.ts', '--entry', 'test/fixtures/simple.ts', '--out-dir', 'tmp/simple-build', '--clean', '--no-dts'], {
      cwd: process.cwd()
    })
    
    await b.expect('Build completed', 25000)
    
    console.log('✅ Builder no-dts test passed')
  })
}

async function runAllBuilderTests() {
  console.log('🎯 Starting @akaoio/builder Battle tests (recovered)')
  
  const tests = [
    { name: 'Help Command', fn: testBuilderHelp },
    { name: 'Simple Build', fn: testBuilderSimpleBuild },
    { name: 'Library Target', fn: testBuilderLibraryTarget },
    { name: 'Multi-Format', fn: testBuilderMultiFormat },
    { name: 'Verbose Output', fn: testBuilderVerbose },
    { name: 'Error Handling', fn: testBuilderNonExistentEntry },
    { name: 'Node Target', fn: testBuilderNodeTarget },
    { name: 'Browser Target', fn: testBuilderBrowserTarget },
    { name: 'No DTS Option', fn: testBuilderNoDts }
  ]
  
  const results = []
  
  for (const test of tests) {
    try {
      console.log(`\n▶️ Running ${test.name}...`)
      await test.fn()
      results.push({ name: test.name, status: 'passed' })
      console.log(`✅ ${test.name} PASSED`)
    } catch (error) {
      results.push({ name: test.name, status: 'failed', error: error.message })
      console.error(`❌ ${test.name} FAILED:`, error.message)
    }
  }
  
  // Summary
  console.log('\n📋 Builder Battle Test Summary:')
  
  const passed = results.filter(r => r.status === 'passed').length
  const failed = results.filter(r => r.status === 'failed').length
  
  results.forEach(result => {
    const icon = result.status === 'passed' ? '✅' : '❌'
    console.log(`${icon} ${result.name}`)
    if (result.error) {
      console.log(`   Error: ${result.error}`)
    }
  })
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`)
  
  if (failed > 0) {
    process.exit(1)
  } else {
    console.log('\n🎉 All builder tests passed!')
  }
}

// Run tests if called directly
if (require.main === module) {
  runAllBuilderTests().catch(error => {
    console.error('💥 Builder test runner failed:', error)
    process.exit(1)
  })
}

module.exports = { runAllBuilderTests }