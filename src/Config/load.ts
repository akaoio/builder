import type { BuildConfig } from "../types/index.js"
import { existsSync } from "node:fs"
import { resolve as resolvePath } from "node:path"
import { pathToFileURL } from "node:url"

export async function load(): Promise<Partial<BuildConfig>> {
  const configs = [
    'builder.config.js',
    'builder.config.mjs',
    'builder.config.ts',
    'build.config.js',
    'build.config.mjs',
    'build.config.ts'
  ]

  for (const configFile of configs) {
    const configPath = resolvePath(process.cwd(), configFile)
    if (existsSync(configPath)) {
      try {
        const fileUrl = pathToFileURL(configPath).href
        const module = await import(fileUrl)
        return module.default || module
      } catch (error) {
        console.warn(`Failed to load config from ${configFile}:`, error)
      }
    }
  }

  // Try to load from package.json
  const packagePath = resolvePath(process.cwd(), 'package.json')
  if (existsSync(packagePath)) {
    try {
      const packageJson = await import(pathToFileURL(packagePath).href, {
        with: { type: 'json' }
      })
      if (packageJson.default?.builder) {
        return packageJson.default.builder
      }
    } catch (error) {
      console.warn('Failed to load builder config from package.json:', error)
    }
  }

  return {}
}