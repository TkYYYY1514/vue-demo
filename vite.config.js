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
  base: process.env.NODE_ENV === 'production' ? '/vue-demo/' : '/',
})