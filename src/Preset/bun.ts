import type { PresetConfig } from "../types/index.js"

export function bun(): PresetConfig {
  return {
    name: 'bun',
    formats: ['esm'],
    dts: false,
    sourcemap: 'inline',
    platform: 'node',
    external: ['bun', 'bun:*'],
    bundle: true,
    splitting: true,
    treeshake: true,
    minify: process.env.NODE_ENV === 'production'
  }
}