import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: '891051034215-4aikq9mr0f94prpqosc0e1l07o6c95h5.apps.googleusercontent.com'
})

app.mount('#app')
