import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          dev: false
        }
      }
    })
  ],
  define: {
    __VUE_PROD_DEVTOOLS__: false
  },
  base: '/vue-demo/',  // 重要：改为新的仓库名
})