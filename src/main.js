import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import { vReveal } from './directives/reveal'
import { vTilt } from './directives/tilt'

const app = createApp(App)
app.directive('reveal', vReveal)
app.directive('tilt', vTilt)
app.use(router)
app.mount('#app')
