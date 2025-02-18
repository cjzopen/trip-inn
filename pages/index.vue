<template>
  <div>
    <Menu />
    <main>
      <h1 class="py-[5rem] text-sky-400 text-3xl">Welcome to Nuxt 3</h1>
      <!-- 其他內容 -->
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
main {
  padding: 2rem;
}
</style>