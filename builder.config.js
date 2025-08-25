/**
 * Example builder configuration for the builder itself
 */
export default {
  entry: ['src/index.ts', 'src/cli.ts'],
  target: 'library',
  formats: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'tsup',
    'esbuild',
    'typescript',
    'chokidar',
    'globby',
    'picocolors',
    'commander',
    '@akaoio/battle'
  ],
  bundle: false,
  treeshake: true,
  platform: 'node'
}