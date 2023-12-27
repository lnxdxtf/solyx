<template>
    <div>
        <div class="w-full h-full flex flex-col gap-4">
            <div class="w-full flex items-center gap-2 text-primary text-xl p-4 text-center font-bold">
                <span>Latests Transactions</span>(
                <span class="s">
                    <span>{{transaction_count}}</span>
                </span>)
            </div>
            <div class="w-full h-[700px] overflow-y-auto flex flex-col p-4 gap-8 ">
                <Transaction v-for="t in total_transactions" :key="t"
                    class="btn btn-secondary h-fit p-1 rounded-btn cursor-pointer" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import Transaction from './Transaction.vue';
@Component({
    components: {
        Transaction
    }
})
class Transactions extends Vue {
    public transaction_count: number = 0
    public total_transactions: number = 100

    mounted() {
        // TODO: MOVE THIS DATA TO STORE, AND USE WEB WORKER TO UPDATE THE DATA
        setInterval(() => {
            if (this.total_transactions == this.transaction_count ) {
                return
            }
            this.transaction_count += 1
        },1000)
    }
}
export default toNative(Transactions)

</script>
