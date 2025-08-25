import type { BuildConfig, BuildResult } from "../types/index.js"
import { build } from "./build.js"
import { watch } from "./watch.js"
import { clean } from "./clean.js"
import { getTsupConfig } from "./tsup.js"
import { formatResult } from "./format.js"

export class Compiler {
  private config: BuildConfig

  constructor(config: BuildConfig) {
    this.config = config
  }

  async build(): Promise<BuildResult> {
    if (this.config.clean) {
      await clean(this.config.outDir!)
    }

    const tsupConfig = getTsupConfig(this.config)
    const startTime = Date.now()

    try {
      const result = await build(tsupConfig)
      return await formatResult(result, startTime, this.config)
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        outputFiles: [],
        errors: [{
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        }]
      }
    }
  }

  async watch(onChange?: (result: BuildResult) => void): Promise<void> {
    const tsupConfig = getTsupConfig(this.config)
    return watch(tsupConfig, onChange, this.config)
  }

  static build = build
  static watch = watch
  static clean = clean
  static getTsupConfig = getTsupConfig
}