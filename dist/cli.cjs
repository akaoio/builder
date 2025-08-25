#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli.ts
var import_commander = require("commander");

// src/Config/load.ts
var import_node_fs = require("fs");
var import_node_path = require("path");
var import_node_url = require("url");
async function load() {
  const configs = [
    "builder.config.js",
    "builder.config.mjs",
    "builder.config.ts",
    "build.config.js",
    "build.config.mjs",
    "build.config.ts"
  ];
  for (const configFile of configs) {
    const configPath = (0, import_node_path.resolve)(process.cwd(), configFile);
    if ((0, import_node_fs.existsSync)(configPath)) {
      try {
        const fileUrl = (0, import_node_url.pathToFileURL)(configPath).href;
        const module2 = await import(fileUrl);
        return module2.default || module2;
      } catch (error) {
        console.warn(`Failed to load config from ${configFile}:`, error);
      }
    }
  }
  const packagePath = (0, import_node_path.resolve)(process.cwd(), "package.json");
  if ((0, import_node_fs.existsSync)(packagePath)) {
    try {
      const packageJson2 = await import((0, import_node_url.pathToFileURL)(packagePath).href);
      if (packageJson2.default?.builder) {
        return packageJson2.default.builder;
      }
    } catch (error) {
      console.warn("Failed to load builder config from package.json:", error);
    }
  }
  return {};
}

// src/Config/merge.ts
function merge(...configs) {
  const result = {};
  for (const config of configs) {
    if (!config) continue;
    for (const [key, value] of Object.entries(config)) {
      if (value === void 0) continue;
      if (Array.isArray(value)) {
        result[key] = [...value];
      } else if (typeof value === "object" && value !== null) {
        result[key] = { ...result[key] || {}, ...value };
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

// src/Config/validate.ts
var import_node_fs2 = require("fs");
var validFormats = ["cjs", "esm", "iife", "umd"];
var validTargets = ["library", "node", "bun", "browser", "cli", "universal"];
var validPlatforms = ["node", "browser", "neutral"];
function validate(config) {
  if (!config.entry || Array.isArray(config.entry) && config.entry.length === 0) {
    throw new Error("At least one entry point is required");
  }
  const entries = Array.isArray(config.entry) ? config.entry : [config.entry];
  for (const entry of entries) {
    if (!(0, import_node_fs2.existsSync)(entry)) {
      throw new Error(`Entry point does not exist: ${entry}`);
    }
  }
  if (config.formats) {
    for (const format of config.formats) {
      if (!validFormats.includes(format)) {
        throw new Error(`Invalid format: ${format}. Valid formats: ${validFormats.join(", ")}`);
      }
    }
  }
  if (config.target && !validTargets.includes(config.target)) {
    throw new Error(`Invalid target: ${config.target}. Valid targets: ${validTargets.join(", ")}`);
  }
  if (config.platform && !validPlatforms.includes(config.platform)) {
    throw new Error(`Invalid platform: ${config.platform}. Valid platforms: ${validPlatforms.join(", ")}`);
  }
  if (config.tsconfig && !(0, import_node_fs2.existsSync)(config.tsconfig)) {
    throw new Error(`TypeScript config does not exist: ${config.tsconfig}`);
  }
  if (config.formats?.some((f) => f === "iife" || f === "umd") && !config.globalName) {
    throw new Error("globalName is required for IIFE/UMD formats");
  }
  if (config.splitting && config.formats?.includes("iife")) {
    throw new Error("Code splitting is not supported with IIFE format");
  }
  if (config.bundle === false && config.splitting) {
    throw new Error("Code splitting requires bundling to be enabled");
  }
}

// src/Config/defaults.ts
function defaults() {
  return {
    entry: "./src/index.ts",
    outDir: "./dist",
    formats: ["cjs", "esm"],
    target: "library",
    dts: true,
    sourcemap: true,
    clean: false,
    external: [],
    minify: false,
    watch: false,
    platform: "neutral",
    bundle: false,
    treeshake: true,
    keepNames: false,
    shims: true,
    legacyOutput: false,
    metafile: false,
    silent: false,
    verbose: false
  };
}

// src/Config/resolve.ts
var import_node_path2 = require("path");

// src/Preset/library.ts
function library() {
  return {
    name: "library",
    formats: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    platform: "neutral",
    external: [
      "node:*",
      "fs",
      "path",
      "os",
      "crypto",
      "util",
      "stream",
      "events",
      "child_process",
      "worker_threads",
      "cluster",
      "http",
      "https",
      "net",
      "dgram",
      "dns",
      "tls",
      "readline",
      "repl",
      "tty",
      "zlib",
      "querystring",
      "url",
      "buffer",
      "string_decoder",
      "perf_hooks",
      "vm",
      "assert",
      "async_hooks",
      "console",
      "constants",
      "domain",
      "inspector",
      "module",
      "process",
      "punycode",
      "timers",
      "trace_events",
      "v8",
      "wasi"
    ],
    bundle: false,
    treeshake: true,
    minify: false
  };
}

// src/Preset/node.ts
function node() {
  return {
    name: "node",
    formats: ["cjs"],
    dts: false,
    sourcemap: "inline",
    platform: "node",
    external: ["node:*"],
    bundle: true,
    treeshake: true,
    minify: process.env.NODE_ENV === "production"
  };
}

// src/Preset/bun.ts
function bun() {
  return {
    name: "bun",
    formats: ["esm"],
    dts: false,
    sourcemap: "inline",
    platform: "node",
    external: ["bun", "bun:*"],
    bundle: true,
    splitting: true,
    treeshake: true,
    minify: process.env.NODE_ENV === "production"
  };
}

// src/Preset/browser.ts
function browser() {
  return {
    name: "browser",
    formats: ["iife", "esm"],
    dts: false,
    sourcemap: true,
    platform: "browser",
    bundle: true,
    splitting: false,
    treeshake: true,
    minify: true
  };
}

// src/Preset/cli.ts
function cli() {
  return {
    name: "cli",
    formats: ["cjs"],
    dts: false,
    sourcemap: false,
    platform: "node",
    external: ["node:*"],
    bundle: true,
    treeshake: true,
    minify: true
  };
}

// src/Preset/universal.ts
function universal() {
  return {
    name: "universal",
    formats: ["cjs", "esm", "iife", "umd"],
    dts: true,
    sourcemap: true,
    platform: "neutral",
    bundle: false,
    treeshake: true,
    minify: false
  };
}

// src/Preset/index.ts
var Preset = class {
  presets;
  constructor() {
    this.presets = /* @__PURE__ */ new Map();
    this.register();
  }
  register() {
    this.presets.set("library", library());
    this.presets.set("node", node());
    this.presets.set("bun", bun());
    this.presets.set("browser", browser());
    this.presets.set("cli", cli());
    this.presets.set("universal", universal());
  }
  get(target) {
    return this.presets.get(target);
  }
  list() {
    return Array.from(this.presets.keys());
  }
  has(target) {
    return this.presets.has(target);
  }
};

// src/Config/resolve.ts
function resolve(config) {
  const resolved = { ...config };
  if (config.target) {
    const preset = new Preset();
    const presetConfig = preset.get(config.target);
    if (presetConfig) {
      resolved.formats = config.formats || presetConfig.formats;
      resolved.dts = config.dts ?? presetConfig.dts;
      resolved.sourcemap = config.sourcemap ?? presetConfig.sourcemap;
      resolved.platform = config.platform || presetConfig.platform;
      resolved.bundle = config.bundle ?? presetConfig.bundle;
      resolved.treeshake = config.treeshake ?? presetConfig.treeshake;
      resolved.minify = config.minify ?? presetConfig.minify;
      resolved.splitting = config.splitting ?? presetConfig.splitting;
      if (presetConfig.external && !config.external?.length) {
        resolved.external = presetConfig.external;
      }
    }
  }
  if (typeof resolved.entry === "string") {
    resolved.entry = [resolved.entry];
  }
  resolved.entry = resolved.entry.map((e) => (0, import_node_path2.resolve)(process.cwd(), e));
  resolved.outDir = (0, import_node_path2.resolve)(process.cwd(), resolved.outDir || "./dist");
  if (resolved.tsconfig) {
    resolved.tsconfig = (0, import_node_path2.resolve)(process.cwd(), resolved.tsconfig);
  }
  return resolved;
}

// src/Config/index.ts
var Config = class _Config {
  config;
  constructor(config) {
    this.config = config;
  }
  static async create(config) {
    const loaded = await load();
    const merged = merge(defaults(), loaded, config || {});
    const resolved = resolve(merged);
    validate(resolved);
    return new _Config(resolved);
  }
  get() {
    return this.config;
  }
  set(key, value) {
    this.config[key] = value;
    validate(this.config);
  }
  merge(config) {
    this.config = merge(this.config, config);
    validate(this.config);
  }
  static load = load;
  static merge = merge;
  static validate = validate;
  static defaults = defaults;
  static resolve = resolve;
};

// src/Compiler/build.ts
var import_tsup = require("tsup");
async function build(config) {
  return (0, import_tsup.build)(config);
}

// src/Compiler/watch.ts
var import_tsup2 = require("tsup");

// src/Compiler/format.ts
var import_node_fs3 = require("fs");
var import_node_path3 = require("path");
var import_globby = require("globby");
async function formatResult(tsupResult, startTime, config) {
  const duration = Date.now() - startTime;
  const outputFiles = [];
  if (config.outDir) {
    const patterns = [
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs",
      "**/*.d.ts",
      "**/*.d.mts",
      "**/*.d.cts"
    ];
    for (const pattern of patterns) {
      const files = await (0, import_globby.globby)(pattern, {
        cwd: config.outDir,
        absolute: false
      });
      for (const file of files) {
        const fullPath = (0, import_node_path3.join)(config.outDir, file);
        const stats = (0, import_node_fs3.statSync)(fullPath);
        let format = "esm";
        if (file.endsWith(".cjs")) format = "cjs";
        else if (file.endsWith(".mjs")) format = "esm";
        else if (file.includes(".iife.")) format = "iife";
        else if (file.includes(".umd.")) format = "umd";
        outputFiles.push({
          path: fullPath,
          format,
          size: stats.size
        });
      }
    }
  }
  return {
    success: true,
    duration,
    outputFiles,
    metafile: tsupResult?.metafile
  };
}

// src/Compiler/watch.ts
async function watch(tsupConfig, onChange, buildConfig) {
  const config = {
    ...tsupConfig,
    watch: true,
    onSuccess: async () => {
      if (onChange) {
        const result = await formatResult(void 0, Date.now(), buildConfig);
        onChange(result);
      }
      if (buildConfig?.onSuccess) {
        if (typeof buildConfig.onSuccess === "function") {
          await buildConfig.onSuccess();
        } else {
          const { exec } = await import("child_process");
          exec(buildConfig.onSuccess);
        }
      }
    }
  };
  await (0, import_tsup2.build)(config);
}

// src/Compiler/clean.ts
var import_promises = require("fs/promises");
var import_node_fs4 = require("fs");
async function clean(outDir) {
  if ((0, import_node_fs4.existsSync)(outDir)) {
    await (0, import_promises.rm)(outDir, { recursive: true, force: true });
  }
}

// src/Compiler/tsup.ts
function getTsupConfig(config) {
  const tsupConfig = {
    entry: Array.isArray(config.entry) ? config.entry : [config.entry],
    outDir: config.outDir,
    format: config.formats,
    dts: config.dts,
    sourcemap: config.sourcemap,
    clean: false,
    // We handle cleaning separately
    external: config.external,
    minify: config.minify,
    platform: config.platform,
    globalName: config.globalName,
    banner: config.banner ? { js: config.banner } : void 0,
    footer: config.footer ? { js: config.footer } : void 0,
    define: config.define,
    env: config.env,
    tsconfig: config.tsconfig,
    splitting: config.splitting,
    treeshake: config.treeshake,
    pure: config.pure,
    keepNames: config.keepNames,
    bundle: config.bundle,
    shims: config.shims,
    legacyOutput: config.legacyOutput,
    metafile: config.metafile,
    silent: config.silent,
    skipNodeModulesBundle: true,
    noExternal: config.bundle ? void 0 : config.external,
    esbuildOptions(options2) {
      if (config.platform === "node") {
        options2.platform = "node";
        options2.target = "node18";
      } else if (config.platform === "browser") {
        options2.platform = "browser";
        options2.target = "es2020";
      }
      return options2;
    }
  };
  for (const key of Object.keys(tsupConfig)) {
    if (tsupConfig[key] === void 0) {
      delete tsupConfig[key];
    }
  }
  return tsupConfig;
}

// src/Compiler/index.ts
var Compiler = class {
  config;
  constructor(config) {
    this.config = config;
  }
  async build() {
    if (this.config.clean) {
      await clean(this.config.outDir);
    }
    const tsupConfig = getTsupConfig(this.config);
    const startTime = Date.now();
    try {
      const result = await build(tsupConfig);
      return await formatResult(result, startTime, this.config);
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        outputFiles: [],
        errors: [{
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : void 0
        }]
      };
    }
  }
  async watch(onChange) {
    const tsupConfig = getTsupConfig(this.config);
    return watch(tsupConfig, onChange, this.config);
  }
  static build = build;
  static watch = watch;
  static clean = clean;
  static getTsupConfig = getTsupConfig;
};

// src/Builder/constructor.ts
async function constructor(config) {
  const configManager = await Config.create(config);
  const resolvedConfig = configManager.get();
  const compiler = new Compiler(resolvedConfig);
  return {
    config: resolvedConfig,
    compiler
  };
}

// src/Builder/build.ts
var import_picocolors = __toESM(require("picocolors"), 1);
async function build3() {
  const startTime = Date.now();
  if (!this.config.silent) {
    console.log(import_picocolors.default.cyan("Building..."));
  }
  try {
    const result = await this.compiler.build();
    if (!this.config.silent) {
      if (result.success) {
        console.log(import_picocolors.default.green(`\u2713 Build completed in ${result.duration}ms`));
        if (this.config.verbose && result.outputFiles.length > 0) {
          console.log(import_picocolors.default.gray("\nOutput files:"));
          for (const file of result.outputFiles) {
            const size = formatSize(file.size);
            console.log(import_picocolors.default.gray(`  ${file.path} (${file.format}) - ${size}`));
          }
        }
      } else {
        console.log(import_picocolors.default.red(`\u2717 Build failed in ${result.duration}ms`));
        if (result.errors) {
          for (const error of result.errors) {
            console.error(import_picocolors.default.red(error.message));
            if (this.config.verbose && error.stack) {
              console.error(import_picocolors.default.gray(error.stack));
            }
          }
        }
      }
    }
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    const message = error instanceof Error ? error.message : String(error);
    if (!this.config.silent) {
      console.error(import_picocolors.default.red(`\u2717 Build failed: ${message}`));
    }
    return {
      success: false,
      duration,
      outputFiles: [],
      errors: [{
        message,
        stack: error instanceof Error ? error.stack : void 0
      }]
    };
  }
}
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// src/Builder/watch.ts
var import_picocolors2 = __toESM(require("picocolors"), 1);
async function watch2(onChange) {
  if (!this.config.silent) {
    console.log(import_picocolors2.default.cyan("Watching for changes..."));
  }
  const handleChange = (result) => {
    if (!this.config.silent) {
      if (result.success) {
        console.log(import_picocolors2.default.green(`\u2713 Rebuilt in ${result.duration}ms`));
      } else {
        console.log(import_picocolors2.default.red(`\u2717 Build failed`));
        if (result.errors) {
          for (const error of result.errors) {
            console.error(import_picocolors2.default.red(error.message));
          }
        }
      }
    }
    if (onChange) {
      onChange(result);
    }
  };
  await this.compiler.watch(handleChange);
}

// src/Builder/validate.ts
function validate2() {
  Config.validate(this.config);
}

// src/Builder/clean.ts
var import_picocolors3 = __toESM(require("picocolors"), 1);
async function clean2() {
  if (!this.config.silent) {
    console.log(import_picocolors3.default.cyan(`Cleaning ${this.config.outDir}...`));
  }
  await Compiler.clean(this.config.outDir);
  if (!this.config.silent) {
    console.log(import_picocolors3.default.green("\u2713 Clean completed"));
  }
}

// src/Builder/index.ts
var Builder = class _Builder {
  config;
  compiler;
  constructor(config, compiler) {
    this.config = config;
    this.compiler = compiler;
  }
  static async create(config) {
    const { config: resolvedConfig, compiler } = await constructor(config);
    return new _Builder(resolvedConfig, compiler);
  }
  async build() {
    return build3.call(this);
  }
  async watch(onChange) {
    return watch2.call(this, onChange);
  }
  async clean() {
    return clean2.call(this);
  }
  validate() {
    return validate2.call(this);
  }
  getConfig() {
    return this.config;
  }
  async setConfig(config) {
    const { config: resolvedConfig, compiler } = await constructor(config);
    this.config = resolvedConfig;
    this.compiler = compiler;
  }
};

// src/cli.ts
var import_picocolors4 = __toESM(require("picocolors"), 1);
var import_node_fs5 = require("fs");
var import_node_path4 = require("path");
var packageJson = JSON.parse(
  (0, import_node_fs5.readFileSync)((0, import_node_path4.join)(process.cwd(), "package.json"), "utf-8")
);
import_commander.program.name("akao-build").description("Universal TypeScript build tool for @akaoio ecosystem").version(packageJson.version).option("-e, --entry <paths...>", "Entry points").option("-o, --out-dir <dir>", "Output directory").option("-f, --format <formats...>", "Output formats (cjs, esm, iife, umd)").option("-t, --target <target>", "Build target preset (library, node, bun, browser, cli, universal)").option("--dts", "Generate TypeScript declarations").option("--no-dts", "Disable TypeScript declarations").option("--sourcemap", "Generate source maps").option("--no-sourcemap", "Disable source maps").option("--minify", "Minify output").option("--no-minify", "Disable minification").option("--clean", "Clean output directory before build").option("--watch", "Watch mode").option("--bundle", "Bundle dependencies").option("--no-bundle", "Disable bundling").option("--splitting", "Enable code splitting").option("--treeshake", "Enable tree shaking").option("--no-treeshake", "Disable tree shaking").option("--platform <platform>", "Target platform (node, browser, neutral)").option("--global-name <name>", "Global name for IIFE/UMD builds").option("--external <deps...>", "External dependencies").option("--tsconfig <path>", "Path to tsconfig.json").option("--silent", "Silent mode").option("--verbose", "Verbose output");
import_commander.program.parse();
var options = import_commander.program.opts();
async function main() {
  try {
    const config = {};
    if (options.entry) config.entry = options.entry;
    if (options.outDir) config.outDir = options.outDir;
    if (options.format) config.formats = options.format;
    if (options.target) config.target = options.target;
    if (options.dts !== void 0) config.dts = options.dts;
    if (options.sourcemap !== void 0) config.sourcemap = options.sourcemap;
    if (options.minify !== void 0) config.minify = options.minify;
    if (options.clean) config.clean = options.clean;
    if (options.watch) config.watch = options.watch;
    if (options.bundle !== void 0) config.bundle = options.bundle;
    if (options.splitting) config.splitting = options.splitting;
    if (options.treeshake !== void 0) config.treeshake = options.treeshake;
    if (options.platform) config.platform = options.platform;
    if (options.globalName) config.globalName = options.globalName;
    if (options.external) config.external = options.external;
    if (options.tsconfig) config.tsconfig = options.tsconfig;
    if (options.silent) config.silent = options.silent;
    if (options.verbose) config.verbose = options.verbose;
    const builder = await Builder.create(config);
    if (options.watch) {
      await builder.watch();
    } else {
      const result = await builder.build();
      if (!result.success) {
        process.exit(1);
      }
    }
  } catch (error) {
    console.error(import_picocolors4.default.red("Error:"), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
main().catch((error) => {
  console.error(import_picocolors4.default.red("Fatal error:"), error);
  process.exit(1);
});
