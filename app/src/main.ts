import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'animate.css';
import store from './store/store';
import router from './router/router';

async function main() {
    const app = createApp(App)

    app.use(store)
    app.use(router)

    app.mount('#app')
}

await main()