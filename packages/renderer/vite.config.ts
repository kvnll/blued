import { defineConfig } from "vite"
// @ts-nocheck

import vue from "@vitejs/plugin-vue"
// import resolve from 'vite-plugin-resolve'
import electron from "vite-plugin-electron/renderer"
import pkg from "../../package.json"
import Pages from "vite-plugin-pages"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [
    vue(),
    electron(),
    Pages({
      dirs: "src/pages", // 需要生成路由的文件目录
      exclude: ["**/components/*.vue"], // 排除在外的目录，即不将所有 components 目录下的 .vue 文件生成路由
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@img": path.resolve(__dirname, "public"),
      "@/assets": path.resolve(__dirname, "src/assets"),
    },
  },
  base: "./",
  build: {
    outDir: "../../dist/renderer",
    emptyOutDir: true,
    rollupOptions: { output: { format: "commonjs" } },
    sourcemap: true,
  },

  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})
