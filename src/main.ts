import './assets/styles/base.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vueEsign from './components/SignBoard.vue'
vueEsign.install = function (Vue: any) {
    if (this.installed) {
        return
    }
    this.installed = true
    Vue.component('vueEsign', vueEsign)
}

const pinia = createPinia()
const app = createApp(App)
app.use(vueEsign)
app.use(router)
app.use(pinia)
app.mount('#app')
