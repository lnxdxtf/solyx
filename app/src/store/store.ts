import { createStore } from "vuex"
import wallet_store from "./wallet_store";

export default createStore({
    state: {
        mobile: false,
        cdn: import.meta.env.VITE_CDN_URL,
        version: import.meta.env.VITE_VERSION,
    },
    mutations: {
        setMobile(state, mobile) {
            state.mobile = mobile
        }
    },
    modules: {
        wallet_store
    }
})  