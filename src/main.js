import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import 'materialize-css/dist/css/materialize.min.css'

createApp(App)
    .use(store)
    .mount('#app')
