import type { PresetConfig } from "../types/index.js"

export function cli(): PresetConfig {
  return {
    name: 'cli',
    formats: ['cjs'],
    dts: false,
    sourcemap: false,
    platform: 'node',
    external: ['node:*'],
    bundle: true,
    treeshake: true,
    minify: true
  }
}