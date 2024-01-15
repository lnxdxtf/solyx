<template>
    <div>
        <TresCanvas class="!absolute" :clear-color="null" :alpha="true">

            <TresPerspectiveCamera :position="[camera.position.x, camera.position.y, camera.position.z]"
                :look-at="camera.lookAt" />

            <Stars v-if="star.texture" :count="star.count" :size="star.size_stars" :alphaMap="star.texture"
                :rotation="[star.rotation.x, star.rotation.y, star.rotation.z]" />

            <OrbitControls v-if="orbit.active" />
            <!-- MainGroup-1 -->
            <TresGroup>
                <TresGridHelper :position="[0, 0, 0]" :rotation="[0.2, 0, 0]" :scale="[24, 10, 10]" />
                <Box :scale="2" :color="'green'" :position="[0, -10, 0]" :rotation="[2, 0, 2]" />
                <Suspense>
                    <!-- <GLTFModel :position="[0, -25, 0]" :path="main_group.g1.hm.path" :scale="0.2" /> -->
                </Suspense>
            </TresGroup>

            <!-- Lights -->
            <TresGroup>
                <TresDirectionalLight :intensity="2" :position="[3, 3, 3]" />
                <TresAmbientLight :intensity="1" />
            </TresGroup>
            <ScrollControls v-if="!orbit.active" v-model="scroll.progress" />
        </TresCanvas>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';
import { TresCanvas, useRenderLoop, useTexture } from '@tresjs/core'
// @ts-ignore
import { Color, Vector3, SRGBColorSpace, NoToneMapping, TextureLoader } from 'three';
import { OrbitControls, Text3D, Stars, SVG, ScrollControls, Box, GLTFModel } from '@tresjs/cientos'

@Component({
    components: {
        TresCanvas, OrbitControls, Text3D, Stars, SVG, ScrollControls, Box, GLTFModel
    }
})
class Home3D extends Vue {
    // @ts-ignore

    orbit = { active: false }

    scroll = {
        progress: 0,

    }

    main_group = {
        g1: {
            position: new Vector3(0, 0, 0),
            hm: {
                path: "resources/models/harry_moon.glb"
            }

        }
    }

    camera = {
        position: new Vector3(0, 0, 20),
        rotation: new Vector3(0, 0, 0),
        lookAt: new Vector3(0, 0, 0)
    }

    star = {
        rotation: new Vector3(0, 0, 0),
        size_stars: 8,
        count: 3000,
        texture: undefined
    }

    async beforeMount() {
        // @ts-ignore
        this.star.texture = await useTexture(['resources/texture/solyx.png'])
    }

    async mounted() {

        const { onLoop } = useRenderLoop()
        onLoop(async () => {
            // @ts-ignore
            this.setCameraPosition()
            this.rotateStar()
            this.mainGroupAnimate()
        })
    }

    setCameraPosition() {
        if (!this.orbit.active) {
            this.camera.position.y = this.scroll.progress * (-100)
        }
    }

    rotateStar() {
        this.star.rotation.y += 0.00009
        this.star.rotation.z += 0.00005
        this.star.rotation.x += 0.00008
    }

    mainGroupAnimate() {

    }

}
export default toNative(Home3D)
</script>
