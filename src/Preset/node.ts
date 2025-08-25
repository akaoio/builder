import type { PresetConfig } from "../types/index.js"

export function node(): PresetConfig {
  return {
    name: 'node',
    formats: ['cjs'],
    dts: false,
    sourcemap: 'inline',
    platform: 'node',
    external: ['node:*'],
    bundle: true,
    treeshake: true,
    minify: process.env.NODE_ENV === 'production'
  }
}