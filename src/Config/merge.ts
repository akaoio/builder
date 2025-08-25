import type { BuildConfig } from "../types/index.js"

export function merge(...configs: Partial<BuildConfig>[]): BuildConfig {
  const result: any = {}

  for (const config of configs) {
    if (!config) continue

    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) continue

      if (Array.isArray(value)) {
        result[key] = [...value]
      } else if (typeof value === 'object' && value !== null) {
        result[key] = { ...(result[key] || {}), ...value }
      } else {
        result[key] = value
      }
    }
  }

  return result as BuildConfig
}