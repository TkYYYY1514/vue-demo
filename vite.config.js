import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/vue-demo/', // 重要：改为你的仓库名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})