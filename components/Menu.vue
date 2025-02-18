<template>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/web/">web</a></li>
      <!-- <li><a href="/contact">Contact</a></li> -->
    </ul>
  </nav>
</template>

<script setup>
// 這裡可以加入任何需要的腳本
</script>

<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 1rem;
}
ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}
a {
  color: white;
  text-decoration: none;
}
</style>