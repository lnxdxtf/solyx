<template>
    <div>
        <div class="w-full h-full flex flex-col items-center gap-4">

            <Home3D class="w-full h-full relative" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import Home3D from '../components/Home/Home3D.vue';
@Component({
    components: {
        Home3D
    }
})
class Home extends Vue { }
export default toNative(Home)
</script>
