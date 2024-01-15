<template>
    <div>
        <div class="w-full h-full flex flex-col items-center gap-4">

            <div class="w-2/4 h-full flex flex-col">
                <div class="text-4xl text-center">Solyx Ecosystem</div>

                <div class="w-full lg:flex items-center gap-10">
                    <img src="/solyx.png" class="lg:w-2/6">
                    <div class="w-full h-fit flex flex-col gap-4 p-2">
                        <span class="text-4xl font-bold">Multi Platform Token</span>
                        <p class="font-semibold">
                            A common token shared between multiple platforms. (SLYX) is a token shared between our customers
                            and our platform. This token is used to pay for services on our platform and is also used to
                            pay for services on other platforms. This token is also used to pay for services on other
                            platforms.
                        </p>
                        <div class="btn btn-outline">Learn More</div>
                    </div>
                </div>

                <div class="w-full lg:flex items-center gap-10">
                    <img src="/dalle_solyx_system.png" class="lg:w-2/6">
                    <div class="w-full h-fit flex flex-col gap-4 p-2">
                        <span class="text-4xl font-bold">Token System</span>
                        <p class="font-semibold">
                            Solyx Token System is a system that allows you to create custom tokens on the Solana blockchain.
                            These tokens can be used for anything from a simple token to a full fledged NFT. We will provide
                            a
                            system that allows you to create your own token and then use it in your own projects. Your
                        </p>
                        <div class="btn btn-outline">Create Token</div>
                    </div>
                </div>

                <div class="w-full lg:flex items-center gap-10">
                    <img src="/dalle_solyx_system_2.png" class="lg:w-2/6">
                    <div class="w-full h-fit flex flex-col gap-4 p-2">
                        <span class="text-4xl font-bold">Exchange System</span>
                        <p class="font-semibold">
                            Tokens created on the Solyx Token System can be traded on the Solyx Exchange System. This system
                            will allow you to trade your tokens for other tokens or for SOL. This system will also allow you
                            to create your own exchange and trade your tokens for other tokens or for SOL.
                        </p>
                        <div class="btn btn-outline">Exchange</div>
                    </div>
                </div>

            </div>


        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator';

@Component({})
class Token extends Vue { }
export default toNative(Token)
</script>