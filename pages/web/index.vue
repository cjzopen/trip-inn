<template>
  <div class="bg-gray-800">
    <Menu />
    <div class="px-5 py-[5rem]">
      <h1 class="text-3xl text-pink-500">About Us</h1>
      <NuxtPage :page-key="route => route.fullPath" />
      <ul class="flex flex-wrap gap-2 pt-4 text-sm text-sky-600 *:rounded-full *:border *:border-sky-200 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10">
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '~/src/components/Menu.vue'
import Footer from '~/src/components/Footer.vue'

export default {
  components: {
    Menu,
    Footer
  },
  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3']
    };
  }
}
</script>

<style scoped>
h1 {
  /* color: #2c3e50; */
}
</style>