# CLAUDE.md - @akaoio/builder

Universal TypeScript build framework for the @akaoio ecosystem. This builder provides a standardized, robust way to build TypeScript projects with multiple output formats.

## Core Architecture

### Class = Directory Pattern
Following @akaoio principles, each class is a directory with one method per file:

```
Builder/
  index.ts          # Class container with delegation
  constructor.ts    # Initialize configuration
  build.ts         # Main build execution
  watch.ts         # Watch mode with rebuilds
  validate.ts      # Configuration validation
  clean.ts         # Clean output directory
```

### Key Features
- Multiple output formats: CJS, ESM, IIFE, UMD
- TypeScript declarations with source maps
- Watch mode with intelligent rebuilds
- Battle-tested with real PTY testing
- Configuration presets for common scenarios
- Multi-runtime support (Bun, Node.js)

### Configuration
Builder uses a cascade of configurations:
1. CLI arguments (highest priority)
2. builder.config.js file
3. Package.json "builder" field
4. Default presets

### Build Targets
- **library**: For NPM packages (CJS + ESM + DTS)
- **node**: For Node.js applications (CJS)
- **bun**: For Bun applications (ESM)
- **browser**: For browser bundles (IIFE/UMD)
- **cli**: For CLI tools (CJS with shebang)
- **universal**: All formats

## Development Principles

### TypeScript ES Modules
All imports MUST use .js extensions for Node.js compatibility:
```typescript
import { Config } from "./Config/index.js"
import { build } from "./build.js"
```

### No Mocks, Real Testing
Uses @akaoio/battle for real PTY testing, not fake pipes.

### Zero Technical Debt
Complete implementation, no TODOs or placeholders.

### Single-Word Methods
Methods use single words or dot notation:
- build()
- watch()
- clean()
- validate()
- preset.load()
- output.format()

## Usage

### CLI
```bash
akao-build            # Build with defaults
akao-build --watch    # Watch mode
akao-build --target library --clean
```

### Programmatic
```typescript
import { Builder } from "@akaoio/builder"

const builder = new Builder({
  entry: "./src/index.ts",
  target: "library",
  clean: true
})

await builder.build()
```

### Configuration File
```javascript
// builder.config.js
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

## Testing
All functionality is tested with @akaoio/battle using real terminal emulation.