// @ts-ignore
import { PublicKey } from "@solana/web3.js"
// @ts-ignore
import { useToast } from "vue-toastification"
import { NETWORK } from "../modules/programs/helper"
import SolyxApp from "../modules/programs/solyx/solyx.app"
import { AnchorProvider } from "@project-serum/anchor"


export default ({
    namespaced: true,

    state: () => ({
        loading_solyx: false,
        network: NETWORK,
        connected: false,
        solyx_data_account: undefined,
        solyx_app: undefined,
    }),

    mutations: {
        set_loading_solyx(state: any, loading_solyx: boolean) {
            state.loading_solyx = loading_solyx
        },
        set_solyx_config(state: any, data: SolyxApp) {
            state.solyx_app = data
        },
        set_solyx_data_account(state: any, data: any) {
            state.solyx_data_account = data
            state.connected = true
        },
        set_reset(state: any) {
            state.connected = false
            state.solyx_app = undefined
            state.solyx_data_account = undefined
            state.loading_solyx = false
        }

    },

    actions: {

        async solyx_config({ commit }: { commit: any }, anchor_provider: AnchorProvider) {
            try {
                commit('set_loading_solyx', true)
                const solyx_app = new SolyxApp(anchor_provider)
                commit('set_solyx_config', solyx_app)
            } catch (_err: any) {
                useToast().error(`Error setting solyx config\n${_err.message}`)
                console.error(_err)
                return _err
            } finally {
                commit('set_loading_solyx', false)
            }
        },

        async create_account({ commit, state, dispatch }: { commit: any, state: any, dispatch: any }) {
            try {
                commit('set_loading_solyx', true)
                const solyx_app = state.solyx_app as SolyxApp
                await solyx_app.initialize()
                await dispatch('fetch_account')
            } catch (_err: any) {
                useToast().error(`Error creating account for solyx\n${_err.message}`)
                console.error(_err)
                return _err
            } finally {
                commit('set_loading_solyx', false)
            }
        },

        async deposit({ commit, state, dispatch }: { commit: any, state: any, dispatch: any }, amount: number) {
            try {
                commit('set_loading_solyx', true)
                const solyx_app = state.solyx_app as SolyxApp
                await solyx_app.deposit(amount)
                await dispatch('fetch_account')
            } catch (_err: any) {
                useToast().error(`Error creating account for solyx\n${_err.message}`)
                console.error(_err)
                return _err
            } finally {
                commit('set_loading_solyx', false)
            }
        },

        async fetch_account({ commit, state }: { commit: any, state: any }) {
            try {
                commit('set_loading_solyx', true)
                const solyx_app = state.solyx_app as SolyxApp
                const data = await solyx_app.fetch_account()
                commit('set_solyx_data_account', data)
            } catch (_err: any) {
                useToast().error(`Error creating account for solyx\n${_err.message}`)
                return _err
            } finally {
                commit('set_loading_solyx', false)
            }
        },

    }
})