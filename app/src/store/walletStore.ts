// @ts-ignore
import { useToast } from "vue-toastification"
import { connect_wallet, disconnect_wallet } from "../modules/wallet/connect"
import { get_solana_provider, wallets_available } from "../modules/wallet/solana"
import { get_anchor_provider } from "../modules/programs/helper"
export default ({
    namespaced: true,

    state: () => ({
        loading_wallet: false,
        pubkey: null,
        wallet_name: null,
        anchor_provider: null,
        solana_provider: null,
        connected: false,
        wallets_available: wallets_available()
    }),

    mutations: {

        set_connected(state: any, connected: boolean) {
            state.connected = connected
        },
        set_pubkey(state: any, pubkey: string | null) {
            state.pubkey = pubkey
        },
        set_loading_wallet(state: any, loading_wallet: boolean) {
            state.loading_wallet = loading_wallet
        },
        set_wallet_name(state: any, wallet_name: string | null) {
            state.wallet_name = wallet_name
        },
        set_providers(state: any, providers: any) {
            state.solana_provider = providers.solana
            state.anchor_provider = providers.anchor
        },
        reset(state: any) {
            state.pubkey = null
            state.wallet_name = null
            state.connected = false
            state.loading_wallet = false
            state.solana_provider = null
            state.anchor_provider = null
        }
    },

    actions: {
        async connect_wallet({ commit }: { commit: any }, data_connect: any) {
            try {
                commit('set_loading_wallet', true)

                const _solana_provider = get_solana_provider(data_connect.wallet_name)
                const _anchor_provider = get_anchor_provider(_solana_provider)

                const pubkey = (await connect_wallet(_solana_provider)).publicKey

                commit('set_wallet_name', data_connect.wallet_name)
                commit('set_providers', { solana: _solana_provider, anchor: _anchor_provider })
                commit('set_pubkey', pubkey)
                commit('set_connected', _solana_provider.isConnected)

                const now = new Date().getTime()
                const data = {
                    // wallet name (phantom, brave, ...)
                    wallet_name: data_connect.wallet_name,
                    // public key
                    wallet_pubkey: pubkey,
                    // time in milliseconds to remember wallet connection
                    time: now + (data_connect.time_minutes_remember * 60 * 1000)
                }
                localStorage.setItem('wallet', JSON.stringify(data))
                useToast().success(`${data_connect.wallet_name} Wallet connected`)

            } catch (_err) {
                useToast().error("Wallet connection error. Check if you have the wallet extension installed and try again.")
                commit('set_loading_wallet', false)
                throw _err
            } finally {
                commit('set_loading_wallet', false)
            }
        },

        async disconnect_wallet({ state, commit }: { state: any, commit: any }) {
            try {
                await disconnect_wallet(state.solana_provider)
                localStorage.removeItem('wallet')
                commit('reset')
                useToast().success("Wallet disconnected")
            } catch (_err) {
                throw _err
            }
        },

        async check_wallet_connection({ commit, dispatch }: { commit: any, dispatch: any }) {
            let interval_check: NodeJS.Timeout | null = null
            try {
                const data = localStorage.getItem('wallet')
                if (data) {
                    const wallet = JSON.parse(data)
                    const _solana_provider = get_solana_provider(wallet.wallet_name)
                    const _anchor_provider = get_anchor_provider(_solana_provider)
                    const pubkey = (await connect_wallet(_solana_provider)).publicKey
                    commit('set_connected', _solana_provider.isConnected)
                    commit('set_wallet_name', wallet.wallet_name)
                    commit('set_providers', { solana: _solana_provider, anchor: _anchor_provider })
                    commit('set_pubkey', pubkey)

                    interval_check = setInterval(async () => {
                        const now = new Date().getTime()
                        if (now >= wallet.time) {
                            await disconnect_wallet(_solana_provider)
                            await dispatch('disconnect_wallet', wallet.wallet_name)
                            useToast().error("Wallet connection expired, please reconnect")
                            if (interval_check) clearInterval(interval_check)
                        } else {
                            if (!_solana_provider.isConnected) await connect_wallet(_solana_provider)
                        }
                    }, 1000)
                }
            } catch (_err) {
                throw _err
            }

        }

    }
})