<template>
    <div>
        <div class="w-full flex flex-col text-sm">
            <div class="flex gap-2">
                <span class="font-bold">SIGNATURE:</span>
                <span class="truncate">3xDDXLYtjvokYcQLCnGJ42SR2k5ZRTeokKHaKYw3Kn7yaYRgZrZKqMwKwvXzPrDoXnGvyhanNXBKr7v9wdYbomd7</span>
            </div>
            <div class="flex gap-2">
                <span class="font-bold">BLOCK:</span>
                <span class="truncate">264663330</span>
            </div>
            <div class="flex gap-2">
                <span class="font-bold">AGE:</span>
                <span class="truncate">9 days ago</span>
            </div>
            <div class="flex gap-2">
                <span class="font-bold">TIMESTAMP:</span>
                <span class="truncate">Dec 11, 2023 at 21:57:13 UTC</span>
            </div>
            <div class="flex gap-2">
                <span class="font-bold">RESULT:</span>
                <div class="badge badge-sm badge-success">SUCCESS</div>
            </div>
     
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';

@Component({})
class Transaction extends Vue { }
export default toNative(Transaction)

</script>
