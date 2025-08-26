#!/usr/bin/env node
/**
 * Use Composer to generate Builder documentation
 */
import { Composer, Template } from '@akaoio/composer';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('=== Builder Documentation Generator ===\n');
console.log('Using @akaoio/composer to generate docs...\n');

// Read package.json for project info
const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

// Create template for README
const readmeTemplate = `# {{name}}

{{description}}

## Version
{{version}}

## Features
{{#each features}}
- {{this}}
{{/each}}

## Installation
\`\`\`bash
npm install {{name}}
\`\`\`

## Usage
\`\`\`javascript
import { Builder } from '{{name}}';

const builder = new Builder({
  entry: './src/index.ts',
  target: 'library'
});

await builder.build();
\`\`\`

Generated with @akaoio/composer
`;

// Create Template instance
const template = new Template(readmeTemplate);

// Render with data
const rendered = template.render({
  data: {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    features: [
      'Multiple output formats (CJS, ESM, IIFE, UMD)',
      'TypeScript support with declarations',
      'Watch mode for development',
      'Battle-tested with real PTY testing',
      'Configuration presets'
    ]
  }
});

console.log('Generated README content:');
console.log('---');
console.log(rendered);
console.log('---');

// Save to file
writeFileSync('README.generated.md', rendered);
console.log('\n✅ Saved to README.generated.md');

// Test Composer's API
const composer = new Composer({
  verbose: true
});
console.log('\n✅ Composer instance created:', composer.constructor.name);

console.log('\n=== Cross-dependency successful! ===');
console.log('Builder successfully used Composer to generate documentation!');
