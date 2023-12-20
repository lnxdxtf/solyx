<template>
    <div>
        <div class="w-full h-full flex flex-col gap-4">
            <div class="w-full text-primary text-xl p-4 text-center font-bold">
                Latests Transactions
            </div>
            <div class="w-full h-[700px] overflow-y-auto flex flex-col p-4 gap-8 ">
                <Transaction v-for="t in 20" :key="t"
                    class="bg-primary text-primary-content p-1 rounded-btn cursor-pointer" />
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
class Transactions extends Vue { }
export default toNative(Transactions)

</script>
