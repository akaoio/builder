import type { BuildConfig } from "../types/index.js"
import { resolve as resolvePath } from "node:path"
import { Preset } from "../Preset/index.js"

export function resolve(config: BuildConfig): BuildConfig {
  const resolved = { ...config }

  // Apply preset if target is specified
  if (config.target) {
    const preset = new Preset()
    const presetConfig = preset.get(config.target)
    if (presetConfig) {
      // Preset values are defaults, config overrides them
      resolved.formats = config.formats || presetConfig.formats
      resolved.dts = config.dts ?? presetConfig.dts
      resolved.sourcemap = config.sourcemap ?? presetConfig.sourcemap
      resolved.platform = config.platform || presetConfig.platform
      resolved.bundle = config.bundle ?? presetConfig.bundle
      resolved.treeshake = config.treeshake ?? presetConfig.treeshake
      resolved.minify = config.minify ?? presetConfig.minify
      resolved.splitting = config.splitting ?? presetConfig.splitting
      
      if (presetConfig.external && !config.external?.length) {
        resolved.external = presetConfig.external
      }
    }
  }

  // Normalize entry points
  if (typeof resolved.entry === 'string') {
    resolved.entry = [resolved.entry]
  }
  resolved.entry = (resolved.entry as string[]).map(e => resolvePath(process.cwd(), e))

  // Resolve output directory
  resolved.outDir = resolvePath(process.cwd(), resolved.outDir || './dist')

  // Resolve tsconfig path if provided
  if (resolved.tsconfig) {
    resolved.tsconfig = resolvePath(process.cwd(), resolved.tsconfig)
  }

  return resolved
}