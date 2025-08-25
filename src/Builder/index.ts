import type { BuildConfig, BuildResult } from "../types/index.js"
import { constructor } from "./constructor.js"
import { build } from "./build.js"
import { watch } from "./watch.js"
import { validate } from "./validate.js"
import { clean } from "./clean.js"

export class Builder {
  private config: BuildConfig
  private compiler: any

  private constructor(config: BuildConfig, compiler: any) {
    this.config = config
    this.compiler = compiler
  }

  static async create(config?: Partial<BuildConfig>): Promise<Builder> {
    const { config: resolvedConfig, compiler } = await constructor(config)
    return new Builder(resolvedConfig, compiler)
  }

  async build(): Promise<BuildResult> {
    return build.call(this)
  }

  async watch(onChange?: (result: BuildResult) => void): Promise<void> {
    return watch.call(this, onChange)
  }

  async clean(): Promise<void> {
    return clean.call(this)
  }

  validate(): void {
    return validate.call(this)
  }

  getConfig(): BuildConfig {
    return this.config
  }

  async setConfig(config: Partial<BuildConfig>): Promise<void> {
    const { config: resolvedConfig, compiler } = await constructor(config)
    this.config = resolvedConfig
    this.compiler = compiler
  }
}