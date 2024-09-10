import './assets/styles/base.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vueEsign from './plugins/SignBoard'

const pinia = createPinia()
const app = createApp(App)
app.use(vueEsign as any)
app.use(router)
app.use(pinia)
app.mount('#app')
