import type { BuildConfig } from "../types/index.js"

export function getTsupConfig(config: BuildConfig): any {
  const tsupConfig: any = {
    entry: Array.isArray(config.entry) ? config.entry : [config.entry],
    outDir: config.outDir,
    format: config.formats,
    dts: config.dts,
    sourcemap: config.sourcemap,
    clean: false, // We handle cleaning separately
    external: config.external,
    minify: config.minify,
    platform: config.platform,
    globalName: config.globalName,
    banner: config.banner ? { js: config.banner } : undefined,
    footer: config.footer ? { js: config.footer } : undefined,
    define: config.define,
    env: config.env,
    tsconfig: config.tsconfig,
    splitting: config.splitting,
    treeshake: config.treeshake,
    pure: config.pure,
    keepNames: config.keepNames,
    bundle: config.bundle,
    shims: config.shims,
    legacyOutput: config.legacyOutput,
    metafile: config.metafile,
    silent: config.silent,
    skipNodeModulesBundle: true,
    noExternal: config.bundle ? undefined : config.external,
    esbuildOptions(options: any) {
      if (config.platform === 'node') {
        options.platform = 'node'
        options.target = 'node18'
      } else if (config.platform === 'browser') {
        options.platform = 'browser'
        options.target = 'es2020'
      }
      return options
    }
  }

  // Remove undefined values
  for (const key of Object.keys(tsupConfig)) {
    if (tsupConfig[key] === undefined) {
      delete tsupConfig[key]
    }
  }

  return tsupConfig
}