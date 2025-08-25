#!/usr/bin/env node
import { program } from "commander"
import { Builder } from "./Builder/index.js"
import type { BuildConfig } from "./types/index.js"
import pc from "picocolors"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const packageJson = JSON.parse(
  readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
)

program
  .name('akao-build')
  .description('Universal TypeScript build tool for @akaoio ecosystem')
  .version(packageJson.version)
  .option('-e, --entry <paths...>', 'Entry points')
  .option('-o, --out-dir <dir>', 'Output directory')
  .option('-f, --format <formats...>', 'Output formats (cjs, esm, iife, umd)')
  .option('-t, --target <target>', 'Build target preset (library, node, bun, browser, cli, universal)')
  .option('--dts', 'Generate TypeScript declarations')
  .option('--no-dts', 'Disable TypeScript declarations')
  .option('--sourcemap', 'Generate source maps')
  .option('--no-sourcemap', 'Disable source maps')
  .option('--minify', 'Minify output')
  .option('--no-minify', 'Disable minification')
  .option('--clean', 'Clean output directory before build')
  .option('--watch', 'Watch mode')
  .option('--bundle', 'Bundle dependencies')
  .option('--no-bundle', 'Disable bundling')
  .option('--splitting', 'Enable code splitting')
  .option('--treeshake', 'Enable tree shaking')
  .option('--no-treeshake', 'Disable tree shaking')
  .option('--platform <platform>', 'Target platform (node, browser, neutral)')
  .option('--global-name <name>', 'Global name for IIFE/UMD builds')
  .option('--external <deps...>', 'External dependencies')
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .option('--silent', 'Silent mode')
  .option('--verbose', 'Verbose output')

program.parse()

const options = program.opts()

async function main() {
  try {
    const config: Partial<BuildConfig> = {}

    if (options.entry) config.entry = options.entry
    if (options.outDir) config.outDir = options.outDir
    if (options.format) config.formats = options.format
    if (options.target) config.target = options.target
    if (options.dts !== undefined) config.dts = options.dts
    if (options.sourcemap !== undefined) config.sourcemap = options.sourcemap
    if (options.minify !== undefined) config.minify = options.minify
    if (options.clean) config.clean = options.clean
    if (options.watch) config.watch = options.watch
    if (options.bundle !== undefined) config.bundle = options.bundle
    if (options.splitting) config.splitting = options.splitting
    if (options.treeshake !== undefined) config.treeshake = options.treeshake
    if (options.platform) config.platform = options.platform
    if (options.globalName) config.globalName = options.globalName
    if (options.external) config.external = options.external
    if (options.tsconfig) config.tsconfig = options.tsconfig
    if (options.silent) config.silent = options.silent
    if (options.verbose) config.verbose = options.verbose

    const builder = await Builder.create(config)

    if (options.watch) {
      await builder.watch()
    } else {
      const result = await builder.build()
      if (!result.success) {
        process.exit(1)
      }
    }
  } catch (error) {
    console.error(pc.red('Error:'), error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main().catch(error => {
  console.error(pc.red('Fatal error:'), error)
  process.exit(1)
})