/**
 * @akaoio/builder documentation configuration
 * Uses @akaoio/composer for atomic documentation generation
 */
module.exports = {
  sources: {
    docs: {
      pattern: "src/doc/**/*.yaml",
      parser: "yaml"
    },
    package: {
      pattern: "package.json",
      parser: "json"
    }
  },
  build: {
    tasks: [],
    parallel: true
  },
  outputs: [
    {
      target: "README.md",
      format: "markdown",
      processor: "template",
      template: "src/doc/templates/readme.md"
    },
    {
      target: "docs/API.md",
      format: "markdown",
      processor: "template",
      template: "src/doc/templates/api.md"
    }
  ],
  watch: {
    patterns: ["src/doc/**/*", "package.json"],
    ignore: ["node_modules/**", "dist/**"],
    debounce: 1000
  },
  options: {
    baseDir: ".",
    verbose: process.env.VERBOSE === "true"
  }
}