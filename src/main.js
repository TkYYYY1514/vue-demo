import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// 禁用 Vue Devtools
app.config.devtools = false

app.mount('#app')