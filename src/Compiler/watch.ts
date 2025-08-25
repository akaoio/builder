import { build } from "tsup"
import type { BuildConfig, BuildResult } from "../types/index.js"
import { formatResult } from "./format.js"

export async function watch(
  tsupConfig: any,
  onChange?: (result: BuildResult) => void,
  buildConfig?: BuildConfig
): Promise<void> {
  const config = {
    ...tsupConfig,
    watch: true,
    onSuccess: async () => {
      if (onChange) {
        const result = await formatResult(undefined, Date.now(), buildConfig!)
        onChange(result)
      }
      if (buildConfig?.onSuccess) {
        if (typeof buildConfig.onSuccess === 'function') {
          await buildConfig.onSuccess()
        } else {
          const { exec } = await import('node:child_process')
          exec(buildConfig.onSuccess)
        }
      }
    }
  }

  await build(config)
}