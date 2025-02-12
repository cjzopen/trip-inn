<template>
  <nav>
    <ul>
      <li><nuxt-link to="/" class="home-link">Home</nuxt-link></li>
      <li><nuxt-link to="/about">About</nuxt-link></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: #333;
  padding: 1em;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: inline;
  margin-right: 1em;
}
a {
  color: white;
  text-decoration: none;
}
</style>