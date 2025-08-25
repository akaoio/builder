import type { BuildConfig } from "../types/index.js"
import { Config } from "../Config/index.js"
import { Compiler } from "../Compiler/index.js"

export async function constructor(config?: Partial<BuildConfig>) {
  const configManager = await Config.create(config)
  const resolvedConfig = configManager.get()
  const compiler = new Compiler(resolvedConfig)

  return {
    config: resolvedConfig,
    compiler
  }
}