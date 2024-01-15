import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'animate.css';
import store from './store/store';
import router from './router/router';
import Toast, { POSITION } from "vue-toastification";
import "../node_modules/vue-toastification/dist/index.css";
import Tres from '@tresjs/core'

import { Buffer } from 'buffer';
window.Buffer = Buffer;

export let app_instance: any

async function main() {
    const app = createApp(App)
    app.use(store)
    app.use(Tres)
    app.use(Toast, {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
        transition: "Vue-Toastification__slideBlurred",
        
    })

    await setting_store()

    app.use(router)
    
    app_instance = app.mount('#app')
}

async function setting_store() {
    store.dispatch('toggle_theme')
    await store.dispatch('walletStore/check_wallet_connection')
    let anchor_provider = store.state.walletStore.anchor_provider
    if (anchor_provider) store.dispatch('solyxStore/solyx_config', anchor_provider)
}

await main()
