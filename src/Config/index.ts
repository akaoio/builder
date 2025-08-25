import type { BuildConfig } from "../types/index.js"
import { load } from "./load.js"
import { merge } from "./merge.js"
import { validate } from "./validate.js"
import { defaults } from "./defaults.js"
import { resolve } from "./resolve.js"

export class Config {
  private config: BuildConfig

  private constructor(config: BuildConfig) {
    this.config = config
  }

  static async create(config?: Partial<BuildConfig>): Promise<Config> {
    const loaded = await load()
    const merged = merge(defaults(), loaded, config || {})
    const resolved = resolve(merged)
    validate(resolved)
    return new Config(resolved)
  }

  get(): BuildConfig {
    return this.config
  }

  set(key: keyof BuildConfig, value: any): void {
    (this.config as any)[key] = value
    validate(this.config)
  }

  merge(config: Partial<BuildConfig>): void {
    this.config = merge(this.config, config)
    validate(this.config)
  }

  static load = load
  static merge = merge
  static validate = validate
  static defaults = defaults
  static resolve = resolve
}