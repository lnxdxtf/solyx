<template>
    <div>
        <div class="navbar">
            <div class="flex-1">
                <a class="btn btn-ghost text-xl">Solyx</a>
                <img src="/sun.svg" class="w-10 h-10 bg-accent rounded-full">
            </div>

            <div class="flex-none gap-2">
                <button class="w-[120px] truncate btn btn-outline" onclick="modal_connect.showModal()">
                    <span>Connect</span>
                    <!-- <span>{{ wallet }}</span> -->
                </button>


            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
@Component({})
class TopBar extends Vue {


}
export default toNative(TopBar)


</script>
