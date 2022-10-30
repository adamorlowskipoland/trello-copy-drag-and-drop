import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslintPlugin  from  "vite-plugin-eslint";
// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: [ 'src/**/*.ts',  'src/**/*.vue',  'src/*.ts',  'src/*.vue'],
    }),
  ],
  resolve: {
    alias: {
// @ts-ignore
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
