<template>
  <div>
    <Menu />
    <h1>Welcome to the Home Page</h1>
    <Footer />
  </div>
</template>

<script>
import Menu from '~/src/components/Menu.vue'
import Footer from '~/src/components/Footer.vue'

export default {
  // const { data } = await useAsyncData('item', () => $fetch('/api/item'))
  // const { data } = await useFetch('/api/item')
  components: {
    Menu,
    Footer
  }
}
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
</style>