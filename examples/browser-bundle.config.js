/**
 * Configuration for building a browser bundle
 * IIFE format for direct script tag inclusion
 */
export default {
  entry: './src/index.ts',
  target: 'browser',
  formats: ['iife', 'esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  treeshake: true,
  minify: true,
  platform: 'browser',
  globalName: 'MyLibrary',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  footer: '// Built with @akaoio/builder'
}