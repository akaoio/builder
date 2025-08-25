# @akaoio/builder

Universal TypeScript build framework for the @akaoio ecosystem. A robust, battle-tested builder that standardizes the build process across all our projects.

## Features

- 🚀 **Multiple Output Formats**: CJS, ESM, IIFE, UMD
- 📦 **Build Presets**: Library, Node, Bun, Browser, CLI, Universal
- 🔥 **Fast Builds**: Powered by esbuild via tsup
- 📝 **TypeScript First**: Full TypeScript support with declarations
- 👀 **Watch Mode**: Automatic rebuilds on file changes
- 🧪 **Battle-Tested**: Real PTY testing with @akaoio/battle
- 🎯 **Zero Config**: Smart defaults with preset system
- 🔧 **Fully Configurable**: Override any option when needed

## Installation

```bash
npm install --save-dev @akaoio/builder
```

## Quick Start

### CLI Usage

```bash
# Build with defaults
npx akao-build

# Use a preset
npx akao-build --target library

# Watch mode
npx akao-build --watch

# Multiple formats
npx akao-build --format cjs esm iife --global-name MyLib

# Clean build
npx akao-build --clean

# Verbose output
npx akao-build --verbose
```

### Programmatic Usage

```typescript
import { Builder } from "@akaoio/builder"

const builder = await Builder.create({
  entry: "./src/index.ts",
  target: "library",
  clean: true
})

// Build once
const result = await builder.build()
console.log(`Build ${result.success ? 'succeeded' : 'failed'}`)

// Watch mode
await builder.watch((result) => {
  console.log(`Rebuild completed in ${result.duration}ms`)
})
```

## Configuration

### Configuration File

Create a `builder.config.js` in your project root:

```javascript
export default {
  entry: ["src/index.ts", "src/cli.ts"],
  target: "library",
  formats: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["node:*"],
  minify: process.env.NODE_ENV === "production"
}
```

### Configuration Loading Order

1. CLI arguments (highest priority)
2. `builder.config.{js,mjs,ts}` or `build.config.{js,mjs,ts}`
3. `package.json` "builder" field
4. Default preset configuration

## Build Presets

### Library (Default)
For NPM packages that need both CommonJS and ES modules:
```bash
npx akao-build --target library
```
- Outputs: CJS + ESM
- TypeScript declarations: Yes
- Bundling: No (preserves imports)
- Platform: Neutral

### Node Application
For Node.js applications and services:
```bash
npx akao-build --target node
```
- Output: CJS only
- Bundling: Yes (includes dependencies)
- Platform: Node
- Minification: In production

### Bun Application
For Bun runtime applications:
```bash
npx akao-build --target bun
```
- Output: ESM only
- Code splitting: Yes
- Platform: Node (Bun compatible)

### Browser Bundle
For web applications and libraries:
```bash
npx akao-build --target browser --global-name MyLib
```
- Outputs: IIFE + ESM
- Bundling: Yes
- Minification: Yes
- Platform: Browser

### CLI Tool
For command-line tools:
```bash
npx akao-build --target cli
```
- Output: CJS with shebang
- Bundling: Yes
- Minification: Yes
- Platform: Node

### Universal
All formats for maximum compatibility:
```bash
npx akao-build --target universal --global-name MyLib
```
- Outputs: CJS + ESM + IIFE + UMD
- TypeScript declarations: Yes
- Platform: Neutral

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entry` | string \| string[] | `./src/index.ts` | Entry point(s) |
| `outDir` | string | `./dist` | Output directory |
| `formats` | BuildFormat[] | `['cjs', 'esm']` | Output formats |
| `target` | BuildTarget | `'library'` | Build preset |
| `dts` | boolean | `true` | Generate TypeScript declarations |
| `sourcemap` | boolean \| 'inline' | `true` | Generate source maps |
| `clean` | boolean | `false` | Clean output directory |
| `minify` | boolean | `false` | Minify output |
| `bundle` | boolean | Varies by target | Bundle dependencies |
| `external` | string[] | `[]` | External dependencies |
| `platform` | 'node' \| 'browser' \| 'neutral' | Varies | Target platform |
| `globalName` | string | - | Global name for IIFE/UMD |
| `splitting` | boolean | `false` | Enable code splitting |
| `treeshake` | boolean | `true` | Enable tree shaking |
| `watch` | boolean | `false` | Watch mode |
| `silent` | boolean | `false` | Suppress output |
| `verbose` | boolean | `false` | Verbose output |

## Examples

### Building @akaoio Projects

All @akaoio projects can use the builder with minimal configuration:

```javascript
// @akaoio/tui
export default {
  entry: "./src/index.ts",
  target: "library"
}

// @akaoio/air
export default {
  entry: ["./src/index.ts", "./src/main.ts"],
  target: "library",
  external: ["gun", "node:*"]
}

// @akaoio/battle
export default {
  entry: "./src/index.ts",
  target: "library",
  external: ["node-pty"]
}
```

### Multi-Runtime Support

Build for both Node.js and Bun:

```javascript
export default {
  entry: "./src/index.ts",
  formats: ["cjs", "esm"],
  platform: "neutral",
  define: {
    "typeof Bun": JSON.stringify(typeof Bun !== "undefined")
  }
}
```

### Watch Mode with Notifications

```javascript
const builder = await Builder.create({
  entry: "./src/index.ts",
  watch: true
})

await builder.watch((result) => {
  if (result.success) {
    console.log("✅ Build succeeded")
    // Run tests, restart server, etc.
  } else {
    console.error("❌ Build failed:", result.errors)
  }
})
```

## Architecture

The builder follows @akaoio's class-as-directory pattern:

```
Builder/
  index.ts          # Class container
  constructor.ts    # Initialize configuration
  build.ts         # Build execution
  watch.ts         # Watch mode
  validate.ts      # Config validation
  clean.ts         # Clean output

Config/
  index.ts         # Configuration manager
  load.ts          # Load from files
  merge.ts         # Merge configurations
  validate.ts      # Validate options
  defaults.ts      # Default values
  resolve.ts       # Resolve paths and presets

Compiler/
  index.ts         # Compiler wrapper
  build.ts         # tsup build
  watch.ts         # tsup watch
  tsup.ts          # tsup configuration
  format.ts        # Format results
```

## Development

```bash
# Install dependencies
npm install

# Build the builder
npm run build

# Run tests with Battle
npm test

# Development mode
npm run dev
```

## Testing

All functionality is tested using @akaoio/battle with real PTY emulation:

```bash
npm test
```

Tests cover:
- CLI functionality
- All build presets
- Configuration loading
- Error handling
- Watch mode
- Multi-format builds

## License

MIT

## Contributing

Contributions are welcome! Please ensure:
- Follow the class-as-directory pattern
- Use `.js` extensions in TypeScript imports
- Add Battle tests for new features
- No TODO comments or placeholders
- 100% real implementation

---

Built with ❤️ for the @akaoio ecosystem