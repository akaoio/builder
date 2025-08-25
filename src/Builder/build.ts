import type { BuildResult } from "../types/index.js"
import pc from "picocolors"

export async function build(this: any): Promise<BuildResult> {
  const startTime = Date.now()
  
  if (!this.config.silent) {
    console.log(pc.cyan('Building...'))
  }

  try {
    const result = await this.compiler.build()
    
    if (!this.config.silent) {
      if (result.success) {
        console.log(pc.green(`✓ Build completed in ${result.duration}ms`))
        
        if (this.config.verbose && result.outputFiles.length > 0) {
          console.log(pc.gray('\nOutput files:'))
          for (const file of result.outputFiles) {
            const size = formatSize(file.size)
            console.log(pc.gray(`  ${file.path} (${file.format}) - ${size}`))
          }
        }
      } else {
        console.log(pc.red(`✗ Build failed in ${result.duration}ms`))
        if (result.errors) {
          for (const error of result.errors) {
            console.error(pc.red(error.message))
            if (this.config.verbose && error.stack) {
              console.error(pc.gray(error.stack))
            }
          }
        }
      }
    }

    return result
  } catch (error) {
    const duration = Date.now() - startTime
    const message = error instanceof Error ? error.message : String(error)
    
    if (!this.config.silent) {
      console.error(pc.red(`✗ Build failed: ${message}`))
    }

    return {
      success: false,
      duration,
      outputFiles: [],
      errors: [{
        message,
        stack: error instanceof Error ? error.stack : undefined
      }]
    }
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}