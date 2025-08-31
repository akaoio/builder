// @akaoio/composer configuration for Builder cortex
module.exports = {
  sources: {
    atoms: {
      pattern: 'src/doc/atoms/**/*.yaml',
      parser: 'yaml'
    },
    project: {
      pattern: 'src/doc/project.yaml',
      parser: 'yaml'
    }
  },
  build: {
    tasks: []
  },
  outputs: [
    {
      target: 'README.md',
      template: 'src/doc/templates/readme.md',
      data: {
        project: 'project',
        features: 'atoms.features',
        usage: 'atoms.usage'
      }
    },
    {
      target: 'CLAUDE.md',
      template: 'templates/claude.md',
      data: {
        project: 'project',
        features: 'atoms.features',
        usage: 'atoms.usage'
      }
    },
    {
      target: 'API.md',
      template: 'templates/api.md',
      data: {
        project: 'project',
        features: 'atoms.features',
        usage: 'atoms.usage'
      }
    },
    {
      target: 'BUILD-ARCHITECTURE.md',
      template: 'templates/build-architecture.md',
      data: {
        project: 'project',
        features: 'atoms.features',
        usage: 'atoms.usage'
      }
    }
  ],
  options: {
    baseDir: process.cwd()
  }
}
