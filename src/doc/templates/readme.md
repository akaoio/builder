# {{project.name}}

> {{project.description}}

[![Version](https://img.shields.io/npm/v/{{project.name}}.svg)](https://www.npmjs.com/package/{{project.name}})
[![License](https://img.shields.io/npm/l/{{project.name}}.svg)](https://github.com/akaoio/builder/blob/main/LICENSE)

## Features

{{#each features}}
- **{{name}}**: {{description}}
{{/each}}

## Installation

```bash
{{cli.install}}
```

## Quick Start

### CLI Usage

{{#each cli.commands}}
```bash
{{command}}  # {{description}}
```
{{/each}}

### Programmatic Usage

```typescript
{{api.basic}}
```

### Configuration File

```javascript
{{api.config}}
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

MIT © {{project.author}}

---

*Built with {{project.name}} v{{project.version}}*
*Documentation generated with @akaoio/composer*