<template>
    <div>
        <dialog id="modal_connect" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Connecting Wallet(ACCOUNT)</h3>
                <p>A wallet in Solana blockchain has a keypair, that can be created or imported.</p>

                <template v-if="!connect_stats">
                    <div>

                        <button @click="connect_stats = 'importing_seed'"
                            class="animate__animated animate__fadeIn truncate btn btn-outline modal-action">
                            <span>Import using seed phrases</span>
                        </button>

                        <button @click="connect_stats = 'importing_file'"
                            class="animate__animated animate__fadeIn truncate btn btn-outline modal-action">
                            <span>Import using keypair file</span>
                        </button>
                    </div>
                </template>

                <template v-else>
                    <div>
                        <button @click="reset">
                            <i class="fa-solid fa-left-long"></i>
                        </button>

                        <label v-if="connect_stats != 'importing_file'" class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text">BIP39 Password</span>
                            </div>
                            <input v-model="password" type="password" placeholder="Password"
                                class="input input-bordered w-full max-w-xs" />
                        </label>



                        <!-- IMPORT KEYPAIR SEED -->
                        <template v-if="connect_stats === 'importing_seed'">
                            <div>
                                <div class="w-full flex flex-col gap-2">
                                    <div class="w-full col-span-4">
                                        <p>Type your seed phrase or paste</p>
                                    </div>
                                    <div class="form-control">
                                        <label class="label cursor-pointer">
                                            <span class="label-text">Seed length 24 (default 12)</span>
                                            <input type="checkbox" v-model="seed24" class="checkbox" />
                                        </label>
                                    </div>
                                    <button @click="paste_seed_phrase()"
                                        class="w-fit animate__animated animate__fadeIn truncate btn btn-outline">
                                        <span>Paste Seed</span>
                                    </button>
                                    <div class="grid grid-cols-4 gap-2">
                                        <input v-for="sp in seed24 ? 24 : 12" :key="sp" type="text" :placeholder="`${sp}`"
                                            v-model="seed_phrases_importing[sp - 1]"
                                            class="input input-bordered w-full max-w-xs text-primary-content" />
                                    </div>
                                    <button @click="import_keypair"
                                        class="w-fit animate__animated animate__fadeIn truncate btn btn-outline">
                                        <span>Import</span>
                                    </button>
                                </div>
                            </div>
                        </template>

                        <!-- IMPORT KEYPAIR FILE -->
                        <template v-if="connect_stats === 'importing_file'">
                            <div>
                                <div class="w-full flex flex-col gap-2">
                                    <div class="w-full col-span-4">
                                        <p>Select your keypair file</p>
                                    </div>
                                    <button @click="import_keypair"
                                        class="w-fit animate__animated animate__fadeIn truncate btn btn-outline">
                                        <span>Import</span>
                                    </button>
                                </div>
                            </div>
                        </template>

                    </div>
                </template>



                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn" @click="reset">Close</button>
                    </form>
                </div>

            </div>
        </dialog>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
// @ts-ignore
import { useToast } from "vue-toastification";
import { readText } from '@tauri-apps/api/clipboard';
import { import_keypair_seed_pass } from '../modules/account/account'
import store from '../store/store';
@Component({})
class ModalConnect extends Vue {
    public connect_stats: string | undefined | null = null
    public password: string | undefined | null = null
    public seed24: boolean = false
    public seed_phrases_importing: string[] = []
    public show_seed: boolean = false

    get solana_network(): any {
        return store.state.solana_network
    }


    public async import_keypair() {
        try {
            if (this.connect_stats === 'importing_file') {
                console.log("importing file");

                // @ts-ignore
                const data = await import_keypair_file(this.solana_network.url)
                return
            } else if (this.connect_stats === 'importing_seed') {
                const data = await import_keypair_seed_pass(this.solana_network.url, this.seed_phrases_importing.join(' '), this.password ? this.password : '')
                console.log(data)
            }

            useToast().success('Keypair imported')
        } catch (error) {
            useToast().error("Can't import keypair")
        }
    }

    public paste_seed_phrase() {
        readText().then((data) => {
            if (data) {
                this.seed_phrases_importing = data.split(' ')
            }
        })
    }

    public reset() {
        this.connect_stats = null
        this.password = null
        this.seed_phrases_importing = []
    }

    mounted() {
        // @ts-ignore
        document.addEventListener('keydown', (e: any) => {
            if (e.key === 'Escape') {
                this.reset()
            }
        })

    }
}
export default toNative(ModalConnect)
</script>
