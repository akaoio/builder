# @akaoio/builder

Universal TypeScript build framework for the @akaoio ecosystem

## Version
1.0.1

## Features

- Multiple output formats (CJS, ESM, IIFE, UMD)

- TypeScript support with declarations

- Watch mode for development

- Battle-tested with real PTY testing

- Configuration presets


## Installation
```bash
npm install @akaoio/builder
```

## Usage
```javascript
import { Builder } from '@akaoio/builder';

const builder = new Builder({
  entry: './src/index.ts',
  target: 'library'
});

await builder.build();
```

Generated with @akaoio/composer
