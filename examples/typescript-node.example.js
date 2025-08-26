/**
 * TypeScript Node.js Build Configuration
 * Based on @akaoio/air integration experience
 */

export default {
  // Entry point - single file for simplicity
  entry: 'src/index.ts',
  
  // Output formats
  formats: ['cjs', 'esm'],
  
  // Generate TypeScript declarations
  dts: true,
  
  // Generate source maps for debugging
  sourcemap: true,
  
  // Clean output directory before build
  clean: true,
  
  // Target Node.js environment
  target: 'node',
  
  // External dependencies (not bundled)
  external: [
    // Common Node.js modules
    /^node:/,
    /^fs/,
    /^path/,
    /^crypto/,
    /^child_process/,
    /^os/,
    /^url/,
    /^util/,
    
    // Your external dependencies
    // Add your npm dependencies here
  ],
  
  // Bundle mode
  bundle: true,
  
  // No code splitting for Node.js
  splitting: false,
  
  // Environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  
  // Output configuration
  output: {
    dir: 'dist',
    preserveModules: false
  },
  
  // Watch mode (if --watch flag is passed)
  watch: process.argv.includes('--watch'),
  
  // Minify for production
  minify: process.env.NODE_ENV === 'production'
}