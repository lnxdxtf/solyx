import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'animate.css';
import store from './store/store';
import router from './router/router';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

async function main() {
    const app = createApp(App)
    app.use(store)
    app.use(router)
    app.use(Toast, {
        position: POSITION.TOP_RIGHT,
        timeout: 4000,
        transition: "Vue-Toastification__slideBlurred",
    })
    app.mount('#app')
}

await main()