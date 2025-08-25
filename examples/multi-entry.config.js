/**
 * Configuration for multiple entry points
 * Useful for libraries with separate modules
 */
export default {
  entry: [
    './src/index.ts',
    './src/cli.ts',
    './src/utils.ts',
    './src/plugins/index.ts'
  ],
  target: 'library',
  formats: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  bundle: false,
  splitting: true,
  treeshake: true,
  platform: 'neutral'
}