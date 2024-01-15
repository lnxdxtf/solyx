<template>
  <div>
    <div class="w-screen h-screen flex flex-col hidden-scroll">
      <TopBar class="w-full p-2 bg-base-100" />

      <router-view v-slot="{ Component }">
        <component :is="Component" class="w-full h-full animate__animated animate__fadeIn rounded-box bg-base-300 overflow-x-hidden overflow-y-auto" />
      </router-view>


      <FooterBar class="w-full p-2 bg-neutral text-neutral-content border-t border-neutral" />

    </div>
    <!-- Modals -->
    <div>
      <ModalConnect />
    </div>
  </div>
</template>

<script setup>
import { themeChange } from 'theme-change'
import TopBar from './components/TopBar.vue';
import FooterBar from './components/FooterBar.vue';
import ModalConnect from './components/ModalConnect.vue';

themeChange(true)
const theme = localStorage.getItem('theme') || 'synthwave'
const html_doc = document.querySelector("html")
html_doc.setAttribute("data-theme", theme);

</script>
