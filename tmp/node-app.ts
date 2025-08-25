import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function loadConfig(file: string): any {
  const path = join(process.cwd(), file)
  const content = readFileSync(path, 'utf-8')
  return JSON.parse(content)
}

console.log('Node.js Application')
console.log('Current directory:', process.cwd())

// If called directly
if (require.main === module) {
  console.log('Running as main module')
}