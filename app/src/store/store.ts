// @ts-ignore
import { createStore } from "vuex"
import walletStore from "./walletStore";
import solyxStore from "./solyxStore";

export default createStore({
    state: {
        mobile: false,
        cdn: import.meta.env.VITE_CDN_URL,
        version: import.meta.env.VITE_VERSION,
        theme: null
    },
    mutations: {
        set_mobile(state: any, mobile: boolean) {
            state.mobile = mobile
        },
        set_theme(state: any, theme: string) {
            state.theme = theme
        }
    },
    actions: {
        toggle_theme({ commit }: { commit: any }) {
            const dark = "business"
            const light = "corporate"
            // @ts-ignore
            let theme = localStorage.getItem('theme') || light
            theme = theme == dark ? light : dark
    
            // @ts-ignore
            localStorage.setItem('theme', theme)
            // @ts-ignore
            const html_doc = document.querySelector("html")
            // @ts-ignore
            html_doc.setAttribute("data-theme", theme);
        }
    },
    modules: {
        walletStore,
        solyxStore

    }
})  