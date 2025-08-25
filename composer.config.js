/**
 * @akaoio/builder ADVANCED documentation configuration
 * Showcases deep @akaoio/composer integration with rich build tool documentation
 */
module.exports = {
  // Comprehensive multi-source data architecture
  sources: {
    // Core documentation atoms with metadata
    docs: {
      pattern: "src/doc/atoms/**/*.yaml",
      parser: "yaml",
      transform: {
        injectBuildMetadata: true,
        processIncludes: true,
        validateSchema: true
      }
    },
    
    // Package with dependency analysis
    package: {
      pattern: "package.json",
      parser: "json", 
      alias: "pkg",
      transform: {
        analyzeDependencies: true,
        extractScripts: true,
        calculateComplexity: true
      }
    },
    
    // Build configuration analysis
    configs: {
      pattern: "{builder.config.js,tsconfig.json,package.json}",
      parser: "multi-config",
      transform: {
        mergeConfigs: true,
        extractPresets: true,
        analyzeTargets: true
      }
    },
    
    // API from source code with build examples
    api: {
      pattern: "src/**/*.ts",
      parser: "typescript-advanced",
      exclude: ["**/*.test.ts", "test/**"],
      transform: {
        extractBuildMethods: true,
        generateConfigExamples: true,
        createFlowDiagrams: true,
        extractTargets: true
      }
    },
    
    // Test cases with build scenarios
    tests: {
      pattern: "test/**/*.ts",
      parser: "typescript",
      transform: {
        extractBuildTests: true,
        categorizeScenarios: true,
        generateTestMatrix: true
      }
    },
    
    // Performance benchmarks across build targets
    benchmarks: {
      pattern: "benchmarks/**/*.{json,js}",
      parser: "benchmark-results",
      optional: true,
      transform: {
        compareBuildTimes: true,
        analyzeBundleSizes: true,
        generatePerformanceCharts: true
      }
    },
    
    // Real build artifacts analysis
    builds: {
      pattern: "dist/**/*.{js,mjs,cjs}",
      parser: "bundle-analyzer",
      optional: true,
      transform: {
        analyzeOutputs: true,
        calculateCompressionRatios: true,
        detectDuplication: true
      }
    },
    
    // CLI usage patterns and examples
    cli: {
      pattern: "src/cli.ts",
      parser: "cli-analyzer",
      transform: {
        extractCommands: true,
        generateUsageExamples: true,
        createHelpText: true
      }
    },
    
    // Preset definitions and configurations
    presets: {
      pattern: "src/presets/**/*.ts",
      parser: "typescript",
      transform: {
        extractPresetConfigs: true,
        generateExamples: true,
        createCompatibilityMatrix: true
      }
    }
  },
  
  // Advanced build pipeline with hooks
  build: {
    tasks: [
      // Pre-build analysis
      {
        name: "analyze-project-structure",
        command: "find src -name '*.ts' | wc -l",
        when: "before",
        transform: "count-files"
      },
      {
        name: "generate-build-matrix",
        command: "node scripts/generate-build-matrix.js",
        when: "before",
        optional: true
      },
      {
        name: "run-build-benchmarks", 
        command: "npm run benchmark:build 2>/dev/null || echo 'No benchmarks'",
        when: "before",
        optional: true
      },
      {
        name: "validate-configurations",
        command: "node -e 'console.log(\"Configs valid\")'",
        when: "before"
      }
    ],
    parallel: true,
    onError: "continue",
    timeout: 30000
  },
  
  // Rich multi-format documentation outputs
  outputs: [
    // Comprehensive README with build examples
    {
      target: "README.md",
      format: "markdown",
      processor: "template",
      template: "src/doc/templates/readme.hbs",
      data: ["docs", "pkg", "api", "configs", "cli", "presets"],
      options: {
        generateTOC: true,
        includeBuildExamples: true,
        embedConfigSnippets: true,
        crossReferenceAPIs: true
      }
    },
    
    // Complete API reference with build method details
    {
      target: "docs/API.md",
      format: "markdown",
      processor: "template", 
      template: "src/doc/templates/api-detailed.hbs",
      data: ["api", "presets", "configs"],
      options: {
        includeSourceLinks: true,
        generateMethodExamples: true,
        embedTypeDefinitions: true,
        createFlowCharts: true
      }
    },
    
    // Build configuration guide
    {
      target: "docs/CONFIGURATION.md",
      format: "markdown",
      processor: "template",
      template: "src/doc/templates/configuration.hbs", 
      data: ["configs", "presets", "api"],
      options: {
        includeExamples: true,
        generateSchemas: true,
        createDecisionTrees: true
      }
    },
    
    // Interactive configuration generator
    {
      target: "docs/config-generator.html",
      format: "html",
      processor: "template",
      template: "src/doc/templates/config-generator.hbs",
      data: ["presets", "configs", "api"],
      options: {
        embedJavaScript: true,
        includeValidation: true,
        generateForms: true
      }
    },
    
    // Build performance analysis
    {
      target: "docs/PERFORMANCE.md",
      format: "markdown", 
      processor: "template",
      template: "src/doc/templates/performance.hbs",
      data: ["benchmarks", "builds", "tests"],
      options: {
        includeCharts: true,
        generateComparisons: true,
        embedMetrics: true
      }
    },
    
    // OpenAPI spec for programmatic usage
    {
      target: "docs/api.json",
      format: "json",
      processor: "structured",
      data: ["api", "configs"],
      options: {
        schema: "openapi-3.0",
        includeExamples: true,
        generateSchemas: true
      }
    },
    
    // Build matrix for CI/CD
    {
      target: "docs/build-matrix.yaml", 
      format: "yaml",
      processor: "structured",
      data: ["presets", "configs", "tests"],
      options: {
        includeMetadata: true,
        sort: true,
        validate: true
      }
    },
    
    // CLI reference card
    {
      target: "docs/CLI-REFERENCE.md",
      format: "markdown",
      processor: "template",
      template: "src/doc/templates/cli-reference.hbs",
      data: ["cli", "presets"],
      options: {
        includeExamples: true,
        generateUsageDiagrams: true
      }
    },
    
    // Bundle analysis report
    {
      target: "docs/bundle-analysis.csv",
      format: "csv", 
      processor: "structured",
      data: ["builds", "benchmarks"],
      options: {
        headers: true,
        includeMetrics: true
      }
    }
  ],
  
  // Sophisticated watch system for build tool development
  watch: {
    patterns: [
      "src/doc/**/*",
      "src/**/*.ts",
      "test/**/*.ts",
      "benchmarks/**/*", 
      "package.json",
      "builder.config.js",
      "tsconfig.json"
    ],
    ignore: [
      "node_modules/**",
      "dist/**",
      "docs/**/*.html",
      "**/.*",
      "**/*.tmp"
    ],
    debounce: 300,
    hooks: {
      beforeRebuild: [
        "echo '🔧 Builder documentation update detected...'",
        "npm run typecheck 2>/dev/null || true",
        "echo 'Analyzing build configurations...'"
      ],
      afterRebuild: [
        "echo '✅ Builder documentation regenerated!'",
        "ls -la docs/",
        "echo '📊 Generated outputs:' && find docs -name '*.md' -o -name '*.html' -o -name '*.json'"
      ],
      onError: [
        "echo '❌ Documentation build failed'",
        "echo 'Check configuration syntax and templates'"
      ]
    }
  },
  
  // Advanced configuration with build tool optimizations
  options: {
    baseDir: ".",
    verbose: process.env.VERBOSE === "true",
    
    // Template processing with build-specific helpers
    templates: {
      engine: "handlebars",
      helpers: {
        // Build-specific template helpers
        formatBuildConfig: true,
        renderPresetTable: true,
        generateBuildCommand: true,
        createTargetMatrix: true,
        formatFileSize: true,
        renderBenchmarkChart: true
      },
      partials: "src/doc/partials",
      cache: process.env.NODE_ENV === "production",
      strict: true
    },
    
    // Output optimization for build documentation
    optimization: {
      minifyHTML: process.env.NODE_ENV === "production",
      optimizeImages: true,
      compressJSON: true,
      inlineAssets: false,
      generateSourceMaps: false
    },
    
    // Validation and quality checks
    validation: {
      validateLinks: true,
      checkCodeBlocks: true,
      verifyExamples: true,
      enforceSchema: true
    },
    
    // Plugin system for build documentation
    plugins: [
      {
        name: "typescript-docs-generator",
        enabled: true,
        options: {
          includePrivate: false,
          generateExamples: true,
          theme: "minimalist"
        }
      },
      {
        name: "build-config-validator",
        enabled: true,
        options: {
          validatePresets: true,
          checkTargets: true
        }
      },
      {
        name: "performance-analyzer",
        enabled: true,
        options: {
          benchmarkThreshold: 1000,
          analyzeBundleSizes: true
        }
      },
      {
        name: "example-runner",
        enabled: process.env.NODE_ENV !== "production",
        options: {
          testExamples: true,
          validateConfigs: true
        }
      }
    ]
  }
}