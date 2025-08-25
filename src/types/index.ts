export type BuildFormat = 'cjs' | 'esm' | 'iife' | 'umd'
export type BuildTarget = 'library' | 'node' | 'bun' | 'browser' | 'cli' | 'universal'
export type Runtime = 'node' | 'bun' | 'deno'

export interface BuildConfig {
  entry: string | string[]
  outDir?: string
  formats?: BuildFormat[]
  target?: BuildTarget
  dts?: boolean
  sourcemap?: boolean | 'inline' | 'external'
  clean?: boolean
  external?: string[]
  minify?: boolean
  watch?: boolean
  platform?: 'node' | 'browser' | 'neutral'
  globalName?: string
  banner?: string
  footer?: string
  define?: Record<string, string>
  env?: Record<string, string>
  tsconfig?: string
  splitting?: boolean
  treeshake?: boolean
  pure?: string[]
  keepNames?: boolean
  bundle?: boolean
  shims?: boolean
  legacyOutput?: boolean
  metafile?: boolean
  silent?: boolean
  verbose?: boolean
  onSuccess?: string | (() => void | Promise<void>)
  onError?: (error: Error) => void
}

export interface BuildResult {
  success: boolean
  duration: number
  outputFiles: OutputFile[]
  errors?: BuildError[]
  warnings?: string[]
  metafile?: any
}

export interface OutputFile {
  path: string
  format: BuildFormat
  size: number
  compressed?: number
}

export interface BuildError {
  message: string
  file?: string
  line?: number
  column?: number
  stack?: string
}

export interface PresetConfig {
  name: BuildTarget
  formats: BuildFormat[]
  dts: boolean
  sourcemap: boolean | 'inline'
  platform: 'node' | 'browser' | 'neutral'
  external?: string[]
  bundle: boolean
  splitting?: boolean
  treeshake?: boolean
  minify?: boolean
}

export interface WatchOptions {
  ignore?: string[]
  debounce?: number
  onRebuild?: (result: BuildResult) => void
  clear?: boolean
}