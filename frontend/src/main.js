import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

const app = createApp(App)

const pinia = createPinia().use(( { store } ) => {
    store.$router = app.config.globalProperties.$router
})

app.use(pinia)
app.use(router)

app.mount('#app')
