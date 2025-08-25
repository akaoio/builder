import type { BuildConfig } from "../types/index.js"

export function defaults(): BuildConfig {
  return {
    entry: './src/index.ts',
    outDir: './dist',
    formats: ['cjs', 'esm'],
    target: 'library',
    dts: true,
    sourcemap: true,
    clean: false,
    external: [],
    minify: false,
    watch: false,
    platform: 'neutral',
    bundle: false,
    treeshake: true,
    keepNames: false,
    shims: true,
    legacyOutput: false,
    metafile: false,
    silent: false,
    verbose: false
  }
}