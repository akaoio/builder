// @akaoio/composer configuration for Builder cortex
module.exports = {
  sources: {
    docs: {
      pattern: 'src/doc/**/*.yaml',
      parser: 'yaml'
    }
  },
  build: {
    tasks: []
  },
  outputs: [
    {
      target: 'README.md',
      template: 'templates/readme.md',
      data: 'docs'
    },
    {
      target: 'CLAUDE.md',
      template: 'templates/claude.md',
      data: 'docs'
    },
    {
      target: 'API.md',
      template: 'templates/api.md',
      data: 'docs'
    },
    {
      target: 'BUILD-ARCHITECTURE.md',
      template: 'templates/build-architecture.md',
      data: 'docs'
    }
  ],
  options: {
    baseDir: process.cwd()
  }
}
