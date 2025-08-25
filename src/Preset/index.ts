import type { PresetConfig, BuildTarget } from "../types/index.js"
import { library } from "./library.js"
import { node } from "./node.js"
import { bun } from "./bun.js"
import { browser } from "./browser.js"
import { cli } from "./cli.js"
import { universal } from "./universal.js"

export class Preset {
  private presets: Map<BuildTarget, PresetConfig>

  constructor() {
    this.presets = new Map()
    this.register()
  }

  private register(): void {
    this.presets.set('library', library())
    this.presets.set('node', node())
    this.presets.set('bun', bun())
    this.presets.set('browser', browser())
    this.presets.set('cli', cli())
    this.presets.set('universal', universal())
  }

  get(target: BuildTarget): PresetConfig | undefined {
    return this.presets.get(target)
  }

  list(): BuildTarget[] {
    return Array.from(this.presets.keys())
  }

  has(target: BuildTarget): boolean {
    return this.presets.has(target)
  }
}