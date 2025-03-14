<template>
  <nav id="nav">
    <ul>
      <li><nuxt-link to="/" >Home</nuxt-link></li>
      <li><nuxt-link to="/taiwan/" >Taiwan</nuxt-link></li>
      <!-- <li><a href="/contact">Contact</a></li> -->
    </ul>
  </nav>
</template>

<script setup>
// 這裡可以加入任何需要的腳本
</script>

<style>
#nav {
  background-color: #333;
  color: white;
  padding: 1rem;
  & ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  & a {
    color: white;
    text-decoration: none;
  }
}
</style>