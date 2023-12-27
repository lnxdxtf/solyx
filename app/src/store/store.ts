// @ts-ignore
import { createStore } from "vuex"
import account_store from "./account_store";

export default createStore({
    state: {
        mobile: false,
        cdn: import.meta.env.VITE_CDN_URL,
        version: import.meta.env.VITE_VERSION,
        solana_networks: [
            {
                name: 'Mainnet Beta',
                url: 'https://api.mainnet-beta.solana.com',
                cluster: 'mainnet-beta',
            },
            {
                name: 'Testnet',
                url: 'https://api.testnet.solana.com',
                cluster: 'testnet',
            },
            {
                name: 'Devnet',
                url: 'https://api.devnet.solana.com',
                cluster: 'devnet',
            },
            {
                name: 'Localhost',
                url: 'http//localhost:8899',
                cluster: 'localhost',
            },

        ],
        solana_network: {
            name: 'Localhost',
            url: 'http//localhost:8899',
            cluster: 'localhost',
        },
    },
    mutations: {
        setMobile(state: any, mobile: boolean) {
            state.mobile = mobile
        },
        set_solana_network(state: any, network: any) {
            state.solana_network = network
        }
    },
    modules: {
        account_store
    }
})  