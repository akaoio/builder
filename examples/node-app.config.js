/**
 * Configuration for building a Node.js application
 * Single bundled CommonJS output with dependencies included
 */
export default {
  entry: './src/main.ts',
  target: 'node',
  formats: ['cjs'],
  dts: false,
  sourcemap: 'inline',
  clean: true,
  external: ['node:*'],
  bundle: true,
  treeshake: true,
  minify: process.env.NODE_ENV === 'production',
  platform: 'node',
  banner: '#!/usr/bin/env node',
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
}