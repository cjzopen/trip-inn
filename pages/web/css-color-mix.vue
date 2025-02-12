<template>
  <div class="bg-gray-800">
    <Menu />
    <div class="px-5 py-[5rem]">
      <h1 class="text-3xl text-pink-500">CSS Color Mix</h1>
      <p class="text-sky-600 dark:text-sky-300">這是一個關於 CSS 顏色混合的頁面。</p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useRoute } from 'vue-router';
import { useRuntimeConfig, useServerHead } from '#imports';
import Menu from '~/src/components/Menu.vue';
import Footer from '~/src/components/Footer.vue';

const runtimeConfig = useRuntimeConfig();
const { domainUrl } = runtimeConfig.public;


const headTitle = ref('運用CSS的color-mix()，成為色彩調配大師');
const headDescription = ref('color-mix()在主題色改變或動態改變顏色時，只要改一個色碼，不再需要維護大量變數。');
// const headRobots = ref('');

useServerHead({
  title: headTitle.value,
  meta: [
    { name: 'description', content: headDescription.value },
    { property: 'og:title', content: headTitle.value },
    { property: 'og:description', content: headDescription.value },
    // { property: 'og:url', content: url },
    { property: 'og:image', content: `${domainUrl}/images/og-image.png` },
    { name: 'twitter:title', content: headTitle.value },
    { name: 'twitter:description', content: headDescription.value },
    { name: 'twitter:image', content: `${domainUrl}/images/og-image.png` },
  ]
});
definePageMeta({
  key: route => route.fullPath
});
</script>

<style scoped>
h1 {
  /* color: #2c3e50; */
}
</style>
