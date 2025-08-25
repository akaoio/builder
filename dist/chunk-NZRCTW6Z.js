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

// src/Config/load.ts
import { existsSync } from "fs";
import { resolve as resolvePath } from "path";
import { pathToFileURL } from "url";
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
    const configPath = resolvePath(process.cwd(), configFile);
    if (existsSync(configPath)) {
      try {
        const fileUrl = pathToFileURL(configPath).href;
        const module = await import(fileUrl);
        return module.default || module;
      } catch (error) {
        console.warn(`Failed to load config from ${configFile}:`, error);
      }
    }
  }
  const packagePath = resolvePath(process.cwd(), "package.json");
  if (existsSync(packagePath)) {
    try {
      const packageJson = await import(pathToFileURL(packagePath).href);
      if (packageJson.default?.builder) {
        return packageJson.default.builder;
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
import { existsSync as existsSync2 } from "fs";
var validFormats = ["cjs", "esm", "iife", "umd"];
var validTargets = ["library", "node", "bun", "browser", "cli", "universal"];
var validPlatforms = ["node", "browser", "neutral"];
function validate(config) {
  if (!config.entry || Array.isArray(config.entry) && config.entry.length === 0) {
    throw new Error("At least one entry point is required");
  }
  const entries = Array.isArray(config.entry) ? config.entry : [config.entry];
  for (const entry of entries) {
    if (!existsSync2(entry)) {
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
  if (config.tsconfig && !existsSync2(config.tsconfig)) {
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
import { resolve as resolvePath2 } from "path";
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
  resolved.entry = resolved.entry.map((e) => resolvePath2(process.cwd(), e));
  resolved.outDir = resolvePath2(process.cwd(), resolved.outDir || "./dist");
  if (resolved.tsconfig) {
    resolved.tsconfig = resolvePath2(process.cwd(), resolved.tsconfig);
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
import { build as tsupBuild } from "tsup";
async function build(config) {
  return tsupBuild(config);
}

// src/Compiler/watch.ts
import { build as build2 } from "tsup";

// src/Compiler/format.ts
import { statSync } from "fs";
import { join } from "path";
import { globby } from "globby";
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
      const files = await globby(pattern, {
        cwd: config.outDir,
        absolute: false
      });
      for (const file of files) {
        const fullPath = join(config.outDir, file);
        const stats = statSync(fullPath);
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
  await build2(config);
}

// src/Compiler/clean.ts
import { rm } from "fs/promises";
import { existsSync as existsSync3 } from "fs";
async function clean(outDir) {
  if (existsSync3(outDir)) {
    await rm(outDir, { recursive: true, force: true });
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
    esbuildOptions(options) {
      if (config.platform === "node") {
        options.platform = "node";
        options.target = "node18";
      } else if (config.platform === "browser") {
        options.platform = "browser";
        options.target = "es2020";
      }
      return options;
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
import pc from "picocolors";
async function build3() {
  const startTime = Date.now();
  if (!this.config.silent) {
    console.log(pc.cyan("Building..."));
  }
  try {
    const result = await this.compiler.build();
    if (!this.config.silent) {
      if (result.success) {
        console.log(pc.green(`\u2713 Build completed in ${result.duration}ms`));
        if (this.config.verbose && result.outputFiles.length > 0) {
          console.log(pc.gray("\nOutput files:"));
          for (const file of result.outputFiles) {
            const size = formatSize(file.size);
            console.log(pc.gray(`  ${file.path} (${file.format}) - ${size}`));
          }
        }
      } else {
        console.log(pc.red(`\u2717 Build failed in ${result.duration}ms`));
        if (result.errors) {
          for (const error of result.errors) {
            console.error(pc.red(error.message));
            if (this.config.verbose && error.stack) {
              console.error(pc.gray(error.stack));
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
      console.error(pc.red(`\u2717 Build failed: ${message}`));
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
import pc2 from "picocolors";
async function watch2(onChange) {
  if (!this.config.silent) {
    console.log(pc2.cyan("Watching for changes..."));
  }
  const handleChange = (result) => {
    if (!this.config.silent) {
      if (result.success) {
        console.log(pc2.green(`\u2713 Rebuilt in ${result.duration}ms`));
      } else {
        console.log(pc2.red(`\u2717 Build failed`));
        if (result.errors) {
          for (const error of result.errors) {
            console.error(pc2.red(error.message));
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
import pc3 from "picocolors";
async function clean2() {
  if (!this.config.silent) {
    console.log(pc3.cyan(`Cleaning ${this.config.outDir}...`));
  }
  await Compiler.clean(this.config.outDir);
  if (!this.config.silent) {
    console.log(pc3.green("\u2713 Clean completed"));
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

export {
  library,
  node,
  bun,
  browser,
  cli,
  universal,
  Preset,
  Config,
  Compiler,
  Builder
};
