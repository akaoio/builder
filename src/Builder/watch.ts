import type { BuildResult } from "../types/index.js"
import pc from "picocolors"

export async function watch(this: any, onChange?: (result: BuildResult) => void): Promise<void> {
  if (!this.config.silent) {
    console.log(pc.cyan('Watching for changes...'))
  }

  const handleChange = (result: BuildResult) => {
    if (!this.config.silent) {
      if (result.success) {
        console.log(pc.green(`✓ Rebuilt in ${result.duration}ms`))
      } else {
        console.log(pc.red(`✗ Build failed`))
        if (result.errors) {
          for (const error of result.errors) {
            console.error(pc.red(error.message))
          }
        }
      }
    }

    if (onChange) {
      onChange(result)
    }
  }

  await this.compiler.watch(handleChange)
}