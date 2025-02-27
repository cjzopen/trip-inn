<template>
  <div>
    <Menu />
    <main>
      <h1 class="py-[5rem] px-[2rem] bg-[#abc] text-(--main-color) text-3xl">web</h1>
      <!-- 其他內容 -->
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
// // import { useRoute } from 'vue-router';
import { useServerHead } from '#imports';

import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'

const appConfig = useAppConfig();
const domainUrl = appConfig.domainUrl;

const headTitle = ref('web 資料夾');
const headDescription = ref('hihi。');
// // const headRobots = ref('');

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
</script>

<style scoped>
main {
  padding: 2rem;
}
</style>