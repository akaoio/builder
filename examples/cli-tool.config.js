/**
 * Configuration for building a CLI tool
 * Bundled with shebang for direct execution
 */
export default {
  entry: './src/cli.ts',
  target: 'cli',
  formats: ['cjs'],
  dts: false,
  sourcemap: false,
  clean: true,
  external: ['node:*'],
  bundle: true,
  treeshake: true,
  minify: true,
  platform: 'node',
  banner: '#!/usr/bin/env node\n',
  keepNames: true,
  onSuccess: 'chmod +x dist/cli.js'
}