import type { BuildConfig, BuildResult, OutputFile } from "../types/index.js"
import { statSync } from "node:fs"
import { join } from "node:path"
import { globby } from "globby"

export async function formatResult(
  tsupResult: any,
  startTime: number,
  config: BuildConfig
): Promise<BuildResult> {
  const duration = Date.now() - startTime
  const outputFiles: OutputFile[] = []

  // Find output files
  if (config.outDir) {
    const patterns = [
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.d.ts',
      '**/*.d.mts',
      '**/*.d.cts'
    ]

    for (const pattern of patterns) {
      const files = await globby(pattern, {
        cwd: config.outDir,
        absolute: false
      })

      for (const file of files) {
        const fullPath = join(config.outDir, file)
        const stats = statSync(fullPath)
        
        let format: any = 'esm'
        if (file.endsWith('.cjs')) format = 'cjs'
        else if (file.endsWith('.mjs')) format = 'esm'
        else if (file.includes('.iife.')) format = 'iife'
        else if (file.includes('.umd.')) format = 'umd'

        outputFiles.push({
          path: fullPath,
          format,
          size: stats.size
        })
      }
    }
  }

  return {
    success: true,
    duration,
    outputFiles,
    metafile: tsupResult?.metafile
  }
}