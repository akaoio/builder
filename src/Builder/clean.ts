import { Compiler } from "../Compiler/index.js"
import pc from "picocolors"

export async function clean(this: any): Promise<void> {
  if (!this.config.silent) {
    console.log(pc.cyan(`Cleaning ${this.config.outDir}...`))
  }

  await Compiler.clean(this.config.outDir)

  if (!this.config.silent) {
    console.log(pc.green('✓ Clean completed'))
  }
}