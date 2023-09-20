import { defineConfig } from 'tsup'
import tsconfig from './tsconfig.json'

export default defineConfig((options)=>({
    entry: ['src/index.ts'],
    dts: true,
    outDir: 'dist',
    format: 'esm',
    splitting: false,
    sourcemap: false,
    clean: true,
    target: tsconfig.compilerOptions.target,
    minify: !options.watch
}));