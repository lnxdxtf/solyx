<template>
  <div>
    <div class="w-screen h-screen flex flex-col hidden-scroll">
      <TopBar class="w-full p-2 bg-base-100" />
      <div class="w-full h-full flex items-center justify-center gap-4 p-2">

        <!-- Just show if wallet/account is connected -->
        <Transactions class="w-1/4 h-full bg-primary-content p-2 rounded-box" />

        <router-view v-slot="{ Component }">
          <component :is="Component"
            class="w-3/4 h-full animate__animated animate__fadeIn bg-primary-content p-2 rounded-box" />
        </router-view>

        <div class="w-1/4 h-full bg-primary-content p-2 rounded-box"></div>

      </div>

      <FooterBar class="w-full p-2 bg-primary-content" />

    </div>
    <!-- Modals -->
    <div>
      <ModalConnect />
    </div>
  </div>
</template>

<script setup lang="ts">
import { themeChange } from 'theme-change'
import TopBar from './components/TopBar.vue';
import FooterBar from './components/FooterBar.vue';
import ModalConnect from './components/ModalConnect.vue';
import Transactions from './components/transaction/Transactions.vue';


themeChange(true)
const theme = localStorage.getItem('theme') || 'synthwave'
const html_doc = document.querySelector("html")
html_doc.setAttribute("data-theme", theme);

</script>
