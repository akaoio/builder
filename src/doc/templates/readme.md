# {{project.name}}

{{project.tagline}}

> {{project.foundation}}

[![Version](https://img.shields.io/npm/v/{{project.name}}.svg)](https://www.npmjs.com/package/{{project.name}})
[![License](https://img.shields.io/npm/l/{{project.name}}.svg)](https://github.com/akaoio/builder/blob/main/LICENSE)

## Build System Features

{{#each features.build_system}}
### {{this.name}}

{{this.description}}

{{#if this.benefits}}
**Benefits:**
{{#each this.benefits}}
- {{this}}
{{/each}}
{{/if}}
{{/each}}

## TypeScript Support

{{#each features.typescript_support}}
- **{{this.name}}**: {{this.description}}
{{/each}}

## Output Formats

{{#each features.output_formats}}
### {{this.format}}

{{this.description}}

**Use Cases:**
{{#each this.use_cases}}
- {{this}}
{{/each}}
{{/each}}

## Installation

```bash
npm install -g @akaoio/builder
```

## Quick Start

### Basic Usage

```bash
{{usage.basic_command}}
```

### Build Targets

{{#each usage.build_targets}}
#### {{this.target}}

{{this.description}}

```bash
{{this.command}}
```

**Output:** {{this.output}}
**Environment:** {{this.environment}}

{{/each}}

### API Functions

{{#each usage.api_functions}}
#### {{this.name}}

{{this.description}}

```typescript
{{this.example}}
```
{{/each}}

### Advanced Configuration

```javascript
{{usage.advanced_config}}
```

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