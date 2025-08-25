type BuildFormat = 'cjs' | 'esm' | 'iife' | 'umd';
type BuildTarget = 'library' | 'node' | 'bun' | 'browser' | 'cli' | 'universal';
type Runtime = 'node' | 'bun' | 'deno';
interface BuildConfig {
    entry: string | string[];
    outDir?: string;
    formats?: BuildFormat[];
    target?: BuildTarget;
    dts?: boolean;
    sourcemap?: boolean | 'inline' | 'external';
    clean?: boolean;
    external?: string[];
    minify?: boolean;
    watch?: boolean;
    platform?: 'node' | 'browser' | 'neutral';
    globalName?: string;
    banner?: string;
    footer?: string;
    define?: Record<string, string>;
    env?: Record<string, string>;
    tsconfig?: string;
    splitting?: boolean;
    treeshake?: boolean;
    pure?: string[];
    keepNames?: boolean;
    bundle?: boolean;
    shims?: boolean;
    legacyOutput?: boolean;
    metafile?: boolean;
    silent?: boolean;
    verbose?: boolean;
    onSuccess?: string | (() => void | Promise<void>);
    onError?: (error: Error) => void;
}
interface BuildResult {
    success: boolean;
    duration: number;
    outputFiles: OutputFile[];
    errors?: BuildError[];
    warnings?: string[];
    metafile?: any;
}
interface OutputFile {
    path: string;
    format: BuildFormat;
    size: number;
    compressed?: number;
}
interface BuildError {
    message: string;
    file?: string;
    line?: number;
    column?: number;
    stack?: string;
}
interface PresetConfig {
    name: BuildTarget;
    formats: BuildFormat[];
    dts: boolean;
    sourcemap: boolean | 'inline';
    platform: 'node' | 'browser' | 'neutral';
    external?: string[];
    bundle: boolean;
    splitting?: boolean;
    treeshake?: boolean;
    minify?: boolean;
}
interface WatchOptions {
    ignore?: string[];
    debounce?: number;
    onRebuild?: (result: BuildResult) => void;
    clear?: boolean;
}

declare class Builder {
    private config;
    private compiler;
    private constructor();
    static create(config?: Partial<BuildConfig>): Promise<Builder>;
    build(): Promise<BuildResult>;
    watch(onChange?: (result: BuildResult) => void): Promise<void>;
    clean(): Promise<void>;
    validate(): void;
    getConfig(): BuildConfig;
    setConfig(config: Partial<BuildConfig>): Promise<void>;
}

declare function load(): Promise<Partial<BuildConfig>>;

declare function merge(...configs: Partial<BuildConfig>[]): BuildConfig;

declare function validate(config: BuildConfig): void;

declare function defaults(): BuildConfig;

declare function resolve(config: BuildConfig): BuildConfig;

declare class Config {
    private config;
    private constructor();
    static create(config?: Partial<BuildConfig>): Promise<Config>;
    get(): BuildConfig;
    set(key: keyof BuildConfig, value: any): void;
    merge(config: Partial<BuildConfig>): void;
    static load: typeof load;
    static merge: typeof merge;
    static validate: typeof validate;
    static defaults: typeof defaults;
    static resolve: typeof resolve;
}

declare function build(config: any): Promise<any>;

declare function watch(tsupConfig: any, onChange?: (result: BuildResult) => void, buildConfig?: BuildConfig): Promise<void>;

declare function clean(outDir: string): Promise<void>;

declare function getTsupConfig(config: BuildConfig): any;

declare class Compiler {
    private config;
    constructor(config: BuildConfig);
    build(): Promise<BuildResult>;
    watch(onChange?: (result: BuildResult) => void): Promise<void>;
    static build: typeof build;
    static watch: typeof watch;
    static clean: typeof clean;
    static getTsupConfig: typeof getTsupConfig;
}

declare class Preset {
    private presets;
    constructor();
    private register;
    get(target: BuildTarget): PresetConfig | undefined;
    list(): BuildTarget[];
    has(target: BuildTarget): boolean;
}

declare function library(): PresetConfig;

declare function node(): PresetConfig;

declare function bun(): PresetConfig;

declare function browser(): PresetConfig;

declare function cli(): PresetConfig;

declare function universal(): PresetConfig;

export { type BuildConfig, type BuildError, type BuildFormat, type BuildResult, type BuildTarget, Builder, Compiler, Config, type OutputFile, Preset, type PresetConfig, type Runtime, type WatchOptions, browser, bun, cli, library, node, universal };
