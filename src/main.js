import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import store from "@/store/store";

const app = createApp(App)

app.use(router)
app.use(Vuetify)

app.use(store) // Подключите store как опцию к вашему приложению

app.mount('#app')