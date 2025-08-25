import { rm } from "node:fs/promises"
import { existsSync } from "node:fs"

export async function clean(outDir: string): Promise<void> {
  if (existsSync(outDir)) {
    await rm(outDir, { recursive: true, force: true })
  }
}