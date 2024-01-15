<template>
    <div>
        <dialog id="modal_connect" class="modal">
            <div class="modal-box">
                <template v-if="!connected_wallet">
                    <div>
                        <h3 class="font-bold text-lg">Connecting Wallet</h3>
                        <p>Set a time to save connection wallet (minutes) and select some wallet to connect</p>

                        <span class="text-xs">Time: {{ time_minutes_remember }} minutes</span>
                        <input type="range" min="1" max="120" v-model="time_minutes_remember" class="range" step="1" />
                        <div class="w-full flex justify-between text-xs px-2">
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </div>

                        <div class="grid grid-cols-2 gap-2">
                            <button v-for="wallet in wallets_available" :key="wallet.name"
                                @click="wallet.available ? connect_wallet(wallet.name) : null" class="btn relative"
                                :class="{ '!cursor-not-allowed grayscale': !wallet.available }">
                                <img :src="wallet.img" class="w-3/4 h-10 rounded-box">
                                <span v-if="loading_wallet" class="loading_wallet loading_wallet-spinner"></span>
                                <span v-if="!wallet.available"
                                    class="p-0.5 bg-warning text-warning-content rounded-box absolute -top-2 right-0">
                                    DEVELOPMENT
                                </span>
                            </button>

                        </div>
                    </div>
                </template>
                <template v-else>
                    <div>
                        <h3 class="font-bold text-lg">Disconnect Wallet</h3>
                        <p>If you done, please disconect your wallet</p>
                        <div class="btn" @click="copy">{{ wallet_pubkey }}</div>
                        <button class="btn" @click="disconnect_wallet">Disconnect</button>
                    </div>
                </template>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>

            </div>
        </dialog>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import store from '../store/store';
import { useToast } from 'vue-toastification';
// @ts-ignore
@Component({})
class ModalConnect extends Vue {
    public time_minutes_remember: number = 30

    get wallets_available() {
        // @ts-ignore
        return store.state.walletStore.wallets_available
    }

    get loading_wallet() {
        // @ts-ignore
        return store.state.walletStore.loading_wallet
    }

    get connected_wallet() {
        // @ts-ignore
        return store.state.walletStore.connected
    }

    get wallet_pubkey() {
        return store.state.walletStore.pubkey
    }

    copy() {
        // @ts-ignore
        navigator.clipboard.writeText(this.wallet_pubkey)
        useToast().success('Copied to clipboard')
    }

    async disconnect_wallet() {
        // @ts-ignore
        await store.dispatch('walletStore/disconnect_wallet')
        store.commit('solyxStore/set_reset')
        // @ts-ignore
        const modal = document.getElementById('modal_connect')
        // @ts-ignore
        modal?.close()
        this.$router.push("/")
    }

    async connect_wallet(wallet: string) {
        // @ts-ignore
        const modal = document.getElementById('modal_connect')

        await store.dispatch('walletStore/connect_wallet', { wallet_name: wallet, time_minutes_remember: this.time_minutes_remember })

        let anchor_provider = store.state.walletStore.anchor_provider
        if (anchor_provider) store.dispatch('solyxStore/solyx_config', anchor_provider)

        await store.dispatch('solyxStore/fetch_account')

        if (!store.state.solyxStore.solyx_data_account) {
            await store.dispatch('solyxStore/create_account')
        }

        if (store.state.solyxStore.connected) {
            this.$router.push("/profile")
        } else {
            useToast().error('Error connecting to solyx')
            this.disconnect_wallet()
        }

        // @ts-ignore
        modal?.close()
    }

    mounted() {
        // @ts-ignore
        document.addEventListener('keydown', (e: any) => {
            if (e.key === 'Escape') {
            }
        })

    }
}
export default toNative(ModalConnect)
</script>
