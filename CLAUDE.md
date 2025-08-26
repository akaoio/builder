# CLAUDE.md - @akaoio/builder

> **Last Updated**: August 2025  
> **Version**: 1.0.1  
> **License**: MIT  
> **Language**: TypeScript

## Project Overview

**@akaoio/builder** is a universal TypeScript build framework designed specifically for the @akaoio ecosystem. Built on top of esbuild and tsup, it provides a standardized, robust way to build TypeScript projects with multiple output formats while maintaining consistency across all @akaoio packages.

### Key Features

- **Universal Output**: Generate CJS, ESM, IIFE, UMD formats from single source
- **TypeScript First**: Full TypeScript support with declaration files
- **Multi-Runtime**: Optimized builds for Node.js, Bun, and browsers  
- **Watch Mode**: Intelligent rebuilds with file watching
- **Zero Config**: Works out of the box with sensible defaults
- **Battle Tested**: Real PTY testing with @akaoio/battle framework
- **Configuration Cascade**: CLI → config file → package.json → defaults

### Why Builder Exists

The @akaoio ecosystem requires consistent build tooling across all packages. Builder standardizes:
- TypeScript compilation with proper ES module handling
- Multi-format output generation for maximum compatibility
- Development workflow with watch mode and hot reloading
- Testing integration with Battle framework for real terminal testing

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
Uses Bun test for unit testing and @akaoio/battle for CLI integration testing.

### Testing Philosophy

Following @akaoio principles:
- **No Mocks**: Use real dependencies and integration tests
- **Real PTY Testing**: Terminal interactions tested with Battle framework
- **TDD Approach**: Write tests before implementation
- **100% Real Implementation**: No placeholder or stub code

### Test Structure

```
test/
  Builder/
    build.test.ts        # Core build functionality
    watch.test.ts        # Watch mode validation
    config.test.ts       # Configuration loading
  integration/
    cli.test.ts          # CLI interface testing
    formats.test.ts      # Output format validation
```

---

*Generated with @akaoio/composer on 2025-08-26*

*Builder Framework v1.0.1*