import type { PresetConfig } from "../types/index.js"

export function browser(): PresetConfig {
  return {
    name: 'browser',
    formats: ['iife', 'esm'],
    dts: false,
    sourcemap: true,
    platform: 'browser',
    bundle: true,
    splitting: false,
    treeshake: true,
    minify: true
  }
}