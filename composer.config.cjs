/**
 * Composer configuration for @akaoio/builder
 * TypeScript build framework with multi-format output
 */

module.exports = {
  sources: {
    // Project metadata
    project: {
      pattern: 'src/doc/atoms/project.yaml',
      parser: 'yaml'
    },
    
    // Features
    features: {
      pattern: 'src/doc/atoms/features.yaml',
      parser: 'yaml'
    },
    
    // Usage examples
    usage: {
      pattern: 'src/doc/atoms/usage.yaml',
      parser: 'yaml'
    },
    
    // Package metadata
    package: {
      pattern: 'package.json',
      parser: 'json'
    }
  },
  
  build: {
    tasks: []
  },
  
  outputs: [
    {
      target: 'README.md',
      template: 'src/doc/templates/readme.md',
      format: 'markdown'
    }
  ]
}