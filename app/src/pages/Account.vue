<template>
    <div>
        <button @click="deposit" class="btn btn-primary">Deposit</button>
        <input type="number" v-model="deposit_value">

        <button @click="solyx_fetch_account" class="btn btn-primary">Fetch account</button>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import store from '../store/store';

@Component({})
class Profile extends Vue {

    public deposit_value: number = 0

    async deposit() {
        await store.dispatch('solyxStore/deposit', this.deposit_value)
    }

    async solyx_fetch_account() {
        await store.dispatch('solyxStore/fetch_account')
    }

}
export default toNative(Profile)
</script>
