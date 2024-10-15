import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import typescript from '@rollup/plugin-typescript';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    typescript({ 
      tsconfig: './tsconfig.json',
      include: ['**/*.ts', '**/*.vue']
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ScbdCommon',
      fileName: (format) => `scbd-common.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
