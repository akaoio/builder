import type { BuildConfig, BuildFormat, BuildTarget } from "../types/index.js"
import { existsSync } from "node:fs"

const validFormats: BuildFormat[] = ['cjs', 'esm', 'iife', 'umd']
const validTargets: BuildTarget[] = ['library', 'node', 'bun', 'browser', 'cli', 'universal']
const validPlatforms = ['node', 'browser', 'neutral']

export function validate(config: BuildConfig): void {
  // Validate entry points
  if (!config.entry || (Array.isArray(config.entry) && config.entry.length === 0)) {
    throw new Error('At least one entry point is required')
  }

  const entries = Array.isArray(config.entry) ? config.entry : [config.entry]
  for (const entry of entries) {
    if (!existsSync(entry)) {
      throw new Error(`Entry point does not exist: ${entry}`)
    }
  }

  // Validate formats
  if (config.formats) {
    for (const format of config.formats) {
      if (!validFormats.includes(format)) {
        throw new Error(`Invalid format: ${format}. Valid formats: ${validFormats.join(', ')}`)
      }
    }
  }

  // Validate target
  if (config.target && !validTargets.includes(config.target)) {
    throw new Error(`Invalid target: ${config.target}. Valid targets: ${validTargets.join(', ')}`)
  }

  // Validate platform
  if (config.platform && !validPlatforms.includes(config.platform)) {
    throw new Error(`Invalid platform: ${config.platform}. Valid platforms: ${validPlatforms.join(', ')}`)
  }

  // Validate tsconfig if provided
  if (config.tsconfig && !existsSync(config.tsconfig)) {
    throw new Error(`TypeScript config does not exist: ${config.tsconfig}`)
  }

  // Validate global name for IIFE/UMD formats
  if (config.formats?.some(f => f === 'iife' || f === 'umd') && !config.globalName) {
    throw new Error('globalName is required for IIFE/UMD formats')
  }

  // Validate conflicting options
  if (config.splitting && config.formats?.includes('iife')) {
    throw new Error('Code splitting is not supported with IIFE format')
  }

  if (config.bundle === false && config.splitting) {
    throw new Error('Code splitting requires bundling to be enabled')
  }
}