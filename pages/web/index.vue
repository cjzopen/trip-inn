<template>
  <div>
    <Menu />
    <Breadcrumb :items="breadcrumb" />
    <main>
      <h1 class="pb-4 px-3 text-(--main-color) text-3xl">web 相關</h1>
      <div class="px-3">
        <ul>
          <li>
            <a href="https://cjzopen.github.io/anime/season/">新番表</a>
          </li>
          <li>
            <nuxt-link to="/web/taiwan-lodging">景點找旅宿 x 旅宿找景點（未完成）</nuxt-link>
          </li>
        </ul>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
// // import { useRoute } from 'vue-router';
import { useServerHead } from '#imports';

import Menu from '~/components/Menu.vue';
import Footer from '~/components/Footer.vue';
import Breadcrumb from '~/components/Breadcrumb.vue';

const appConfig = useAppConfig();
const domainUrl = appConfig.domainUrl;

const headTitle = ref('CJ 的記事本');
const headDescription = ref('');
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

const breadcrumb = ref([
  { name: 'web 相關', to: '/web/' }
]);
</script>

<style scoped>
main {
  padding: 2rem;
}
</style>