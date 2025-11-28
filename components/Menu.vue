<template>
  <nav id="nav">
    <ul>
      <!-- <li><nuxt-link to="/">Home</nuxt-link></li> -->
      <li><nuxt-link to="/taiwan">Taiwan</nuxt-link></li>
      <li class="ml-auto"><nuxt-link to="/favorites">我的收藏</nuxt-link></li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';

const router = useRouter();

router.afterEach(() => {
  // 在路由切換後強制觸發 Vue 的 DOM 更新
  nextTick(() => {
    document.body.classList.add('force-update');
    void document.body.offsetWidth; // 強制重繪
    document.body.classList.remove('force-update');
  });
});
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

/* 避免樣式閃爍的過渡效果 */
body.force-update * {
  transition: none !important;
}
</style>