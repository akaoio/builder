import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function readConfig(path: string): any {
  const content = readFileSync(join(process.cwd(), path), 'utf-8')
  return JSON.parse(content)
}

console.log('Node.js application')
