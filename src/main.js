import { createApp } from 'vue'
import App from './App.vue'
import './css/style.css'
import './css/header.css'
import './css/footer.css'
import './css/responsive.css'

import router from './router'

const app = createApp(App)
app.use(router) 
app.mount('#app')
