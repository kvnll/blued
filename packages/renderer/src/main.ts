import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
const router = createRouter()
import BootstrapVue3 from 'bootstrap-vue-3'
import { createPinia } from 'pinia'
import Serialport from 'serialport'
import './assets/css/bootstrap.min.css'
import './assets/css/app.min.css'
import './assets/css/icons.css'
import './assets/css/app-custom.css'
createApp(App)
  .use(router)
  .use(BootstrapVue3)
  .use(createPinia())
  .mount('#app')
  .$nextTick(window.removeLoading)


