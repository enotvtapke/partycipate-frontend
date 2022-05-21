import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

window.axios = require('axios')
window.axios.defaults.baseURL = 'https://partycipate-api.herokuapp.com'
window.axios.defaults.headers = {
    'Access-Control-Allow-Origin': 'https://partycipate.herokuapp.com'
}

// window.axios = require('axios')
// window.axios.defaults.baseURL = 'http://localhost:8080'
// window.axios.defaults.headers = {
//     'Access-Control-Allow-Origin': 'http://localhost:8090'
// }

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
