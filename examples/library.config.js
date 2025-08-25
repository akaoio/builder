/**
 * Configuration for building a TypeScript library
 * Outputs both CommonJS and ES modules with TypeScript declarations
 */
export default {
  entry: './src/index.ts',
  target: 'library',
  formats: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    // Exclude Node.js built-ins
    'node:*',
    'fs',
    'path',
    'os',
    'crypto',
    'util',
    'stream',
    'events'
  ],
  bundle: false,
  treeshake: true,
  minify: false
}