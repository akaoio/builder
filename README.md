# @akaoio/builder

> Universal TypeScript build framework for the @akaoio ecosystem

[![Version](https://img.shields.io/npm/v/@akaoio/builder.svg)](https://www.npmjs.com/package/@akaoio/builder)
[![License](https://img.shields.io/npm/l/@akaoio/builder.svg)](https://github.com/akaoio/builder/blob/main/LICENSE)

## Features


- **Multiple Output Formats**: Build to CJS, ESM, IIFE, UMD formats with a single config

- **TypeScript Declarations**: Automatic .d.ts generation with source maps

- **Watch Mode**: Intelligent rebuild on file changes

- **Zero Config**: Smart defaults with preset configurations

- **Battle-Tested**: Tested with @akaoio/battle using real PTY emulation

- **Multi-Runtime**: Works with Bun, Node.js, and Deno


## Installation

```bash
npm install -g @akaoio/builder
```

## Quick Start

### CLI Usage


```bash
akao-build  # Build with default configuration
```

```bash
akao-build --watch  # Watch mode with auto-rebuild
```

```bash
akao-build --target library  # Build as library with CJS + ESM
```

```bash
akao-build --clean  # Clean output directory before build
```


### Programmatic Usage

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
module.exports = {
  entry: "src/index.ts",
  target: "library",
  formats: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["node:*"],
  minify: process.env.NODE_ENV === "production"
}

```

## Build Targets

- **library**: NPM packages (CJS + ESM + DTS)
- **node**: Node.js applications (CJS)
- **bun**: Bun applications (ESM)
- **browser**: Browser bundles (IIFE/UMD)
- **cli**: CLI tools (CJS with shebang)
- **universal**: All formats

## Architecture

Builder follows the @akaoio principle of "Class = Directory + Method-per-file":

```
Builder/
  index.ts          # Class container
  constructor.ts    # Initialize configuration
  build.ts          # Main build execution
  watch.ts          # Watch mode
  validate.ts       # Config validation
  clean.ts          # Clean output
```

## Testing

Builder is tested with @akaoio/battle using real PTY emulation for maximum accuracy.

```bash
npm test
```

## Documentation

Documentation is generated with @akaoio/composer from atomic YAML files.

```bash
npm run docs:build
```

## License

MIT © AKAO Team

---

*Built with @akaoio/builder v1.0.2*
*Documentation generated with @akaoio/composer*