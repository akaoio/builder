# Builder - TypeScript Guide

## Overview

This guide covers TypeScript build configurations with @akaoio/builder, based on real-world usage in projects like @akaoio/air.

## TypeScript Configuration

### Using TypeScript Compiler Directly

When @akaoio/builder has issues with complex TypeScript projects, you can fallback to using TypeScript compiler directly:

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.prod.json && cp -f src/paths.js dist/paths.js",
    "build:watch": "tsc -p tsconfig.prod.json --watch",
    "build:prod": "rm -rf dist && tsc -p tsconfig.prod.json"
  }
}
```

### tsconfig.prod.json

Production TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "noImplicitAny": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

## Builder Configuration

### Simple Configuration

Start with a simple configuration:

```javascript
export default {
  entry: 'src/index.ts',
  formats: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'node',
  external: [
    /^node:/,
    /^@akaoio\//
  ]
}
```

### Advanced Configuration

For more complex projects:

```javascript
export default {
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    main: 'src/main.ts'
  },
  formats: ['cjs', 'esm'],
  dts: {
    resolve: true,
    entry: './src/index.ts',
    outDir: './dist'
  },
  sourcemap: true,
  clean: true,
  target: 'node14',
  platform: 'node',
  external: [
    /^node:/,
    /^fs/,
    /^path/,
    /^crypto/,
    /^child_process/
  ],
  esbuildOptions: {
    logLevel: 'info',
    charset: 'utf8'
  }
}
```

## Common Issues and Solutions

### Issue: Multiple entry points not working

Builder may have issues with multiple entry points. Solution: Use single entry point or build separately:

```javascript
// Single entry point (recommended)
export default {
  entry: 'src/index.ts',
  // ...
}
```

### Issue: Type declarations not generated

Ensure `dts: true` is set and TypeScript is properly configured:

```javascript
export default {
  dts: true,
  // or more detailed:
  dts: {
    resolve: true,
    entry: './src/index.ts'
  }
}
```

### Issue: Module resolution errors

Add proper external patterns:

```javascript
external: [
  // Node built-ins
  /^node:/,
  /^fs/,
  /^path/,
  
  // Your dependencies
  '@akaoio/gun',
  'node-fetch',
  
  // Pattern for scoped packages
  /^@akaoio\//
]
```

### Issue: Build fails with complex TypeScript

Fallback to TypeScript compiler:

```bash
# Direct TypeScript compilation
npx tsc -p tsconfig.json

# Or use both (tsc for types, builder for bundling)
npx tsc --emitDeclarationOnly && akao-build
```

## Best Practices

### 1. Start Simple

Begin with minimal configuration and add complexity as needed.

### 2. Use TypeScript for Types

Let TypeScript handle type generation:

```json
{
  "scripts": {
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "akao-build",
    "build": "npm run build:types && npm run build:js"
  }
}
```

### 3. Separate Development and Production

Use different configurations:

```javascript
// builder.config.dev.js
export default {
  entry: 'src/index.ts',
  sourcemap: 'inline',
  minify: false,
  watch: true
}

// builder.config.prod.js
export default {
  entry: 'src/index.ts',
  sourcemap: true,
  minify: true,
  clean: true
}
```

### 4. Handle Static Files

Copy static files that shouldn't be bundled:

```json
{
  "scripts": {
    "postbuild": "cp src/paths.js dist/paths.js"
  }
}
```

## Testing Your Build

Always test your build output:

```javascript
// Test CommonJS
const pkg = require('./dist/index.cjs')
console.log('CJS:', typeof pkg)

// Test ES Modules
import('./dist/index.js').then(pkg => {
  console.log('ESM:', typeof pkg.default)
})
```

## Integration with Other Tools

### With TypeScript

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "akao-build",
    "prebuild": "npm run typecheck"
  }
}
```

### With Testing

```json
{
  "scripts": {
    "build": "akao-build",
    "test": "npm run build && node test/index.js",
    "test:watch": "akao-build --watch & nodemon test/index.js"
  }
}
```

### With Linting

```json
{
  "scripts": {
    "lint": "eslint src",
    "build": "npm run lint && akao-build"
  }
}
```

## Performance Tips

1. **Use `external`** - Don't bundle dependencies
2. **Enable `clean`** - Start fresh each build
3. **Use `target`** - Optimize for your Node version
4. **Disable `sourcemap`** in production if not needed
5. **Use `minify` carefully** - May not be needed for Node.js

## Debugging Builds

Enable verbose output:

```javascript
export default {
  // ... your config
  logLevel: 'info',
  // or via environment
  verbose: process.env.VERBOSE === 'true'
}
```

Check the generated files:

```bash
# List all generated files
ls -la dist/

# Check file sizes
du -h dist/*

# Test imports
node -e "require('./dist/index.cjs')"
node -e "import('./dist/index.js')"
```

## Conclusion

@akaoio/builder works well for most TypeScript projects. When you encounter issues, don't hesitate to fallback to TypeScript compiler directly or use a hybrid approach.