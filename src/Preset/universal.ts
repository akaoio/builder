import type { PresetConfig } from "../types/index.js"

export function universal(): PresetConfig {
  return {
    name: 'universal',
    formats: ['cjs', 'esm', 'iife', 'umd'],
    dts: true,
    sourcemap: true,
    platform: 'neutral',
    bundle: false,
    treeshake: true,
    minify: false
  }
}