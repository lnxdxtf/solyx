<template>
    <div>
        <div class="navbar justify-between">

            <div class="flex gap-4" href="/">
                <a class="hidden lg:block text-2xl font-bold" href="/">Solyx</a>
                <div class="dropdown w-14 shadow-2xl bg-black bg-opacity-75 rounded-full">

                    <div tabindex="0" role="button">
                        <img src="/solyx.png" class="w-full">
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li v-for="route in routes" :key="route.name">
                            <div v-if="(route.auth && connected_wallet && connected_solyx) || (!route.auth)"
                                @click="navigate_to(route.path)">
                                <span>{{ route.name }}</span>
                            </div>
                        </li>
                        <li>
                            <label class="swap swap-rotate">

                                <!-- this hidden checkbox controls the state -->
                                <input type="checkbox" @click="toggle_theme()" />

                                <!-- sun icon -->
                                <svg class="swap-on fill-accent w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                <!-- moon icon -->
                                <svg class="swap-off fill-accent w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>

                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="hidden lg:flex gap-4 items-center">
                <div v-for="route in routes" :key="route.name">
                    <button v-if="(route.auth && connected_wallet && connected_solyx) || (!route.auth)"
                        @click="navigate_to(route.path)" class="btn btn-outline">
                        <span>{{ route.name }}</span>
                    </button>
                </div>
            </div>

            <div class="flex-none gap-2">
                <button class="btn btn-outline relative" onclick="modal_connect.showModal()">
                    <span class="w-[120px]" v-if="!connected_wallet">Connect</span>
                    <span class="w-[120px] truncate" v-else>{{ wallet_pubkey }}</span>
                    <div class="absolute hover:scale-125 -top-2 right-0 bg-neutral p-0.5 rounded-box"
                        v-if="connected_wallet && wallet_connected_data">
                        <img class="w-16" :src="wallet_connected_data.img">
                    </div>
                    <!-- <span>{{ wallet }}</span> -->
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import store from '../store/store';
// @ts-ignore
import routes from "../router/routes.json"


@Component({})
class TopBar extends Vue {

    public routes: any[] = routes

    get wallet_connected_data() {
        return store.state.walletStore.wallets_available.find((w: any) => w.name === store.state.walletStore.wallet_name)
    }
    get connected_solyx() {
        return store.state.solyxStore.connected
    }
    get connected_wallet() {
        return store.state.walletStore.connected
    }
    get wallet_pubkey() {
        return store.state.walletStore.pubkey
    }

    toggle_theme() {
        store.dispatch('toggle_theme')
    }

    navigate_to(path: string) {
        this.$router.push(path)
    }

}
export default toNative(TopBar)


</script>
