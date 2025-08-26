// Composer configuration for Builder documentation
export default {
  sources: {
    package: {
      pattern: 'package.json',
      parser: 'json'
    },
    src: {
      pattern: 'src/**/*.ts',
      parser: 'typescript'
    }
  },
  outputs: [
    {
      target: 'API.md',
      template: `# {{package.name}} API Documentation

## Version: {{package.version}}

{{package.description}}

## Main Classes

### Builder
The main class for building TypeScript projects.

## Configuration
See builder.config.js for configuration options.

## Scripts
{{#each package.scripts}}
- \`npm run {{@key}}\`: {{this}}
{{/each}}
`,
      data: 'package'
    }
  ]
}
