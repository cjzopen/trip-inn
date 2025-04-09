<template>
  <div>
    <Menu />
    <main class="bg-sky-900 bg-linear-to-bl from-sky-900 to-purple-300">
      <div class="text-center">
        <h1 class="text-center py-[2rem] text-sky-400 text-5xl mb-4">你的收藏記錄</h1>
      </div>
      <div class="flex justify-center gap-4 mb-4">
        <button @click="filterType('hotel')" class="bg-blue-500 text-white px-4 py-2 rounded">旅宿</button>
        <button @click="filterType('scenic')" class="bg-green-500 text-white px-4 py-2 rounded">景點</button>
      </div>
      <div v-if="filteredFavorites.length" class="p-4">
        <ul>
          <li v-for="(favorite, index) in filteredFavorites" :key="index">
            <p><strong>類型：</strong>{{ favorite.type }}</p>
            <p><strong>名稱：</strong>{{ favorite.Name }}</p>
            <p><strong>地址：</strong>{{ favorite.Add }}</p>
            <hr class="my-2" />
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-center text-white">目前沒有收藏的項目。</p>
      </div>
      <span aria-hidden="true" class="color-ball" v-for="n in 8" :key="n" :style="ballSpanStyle(n)"></span>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Menu from '~/components/Menu.vue';
import Footer from '~/components/Footer.vue';

const favorites = ref([]);
const filteredFavorites = ref([]);
const selectedType = ref(null);

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]');
  filteredFavorites.value = favorites.value; // 預設顯示全部
});

const filterType = (type) => {
  selectedType.value = type;
  filteredFavorites.value = favorites.value.filter(favorite => favorite.type === type);
};

const colors = ['#583C87', '#E45A84', '#FFACAC'];
const particleSize = 20;
const animationDuration = 15;

const ballSpanStyle = (index) => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const top = `${Math.random() * 100}%`;
  const left = `${Math.random() * 100}%`;
  const duration = `${(Math.random() * animationDuration + 10).toFixed(1)}s`;
  const delay = `${(Math.random() * (animationDuration + 10) * -1).toFixed(1)}s`;
  const transformOrigin = `${(Math.random() * 50 - 25).toFixed(1)}vw ${(Math.random() * 50 - 25).toFixed(1)}vh`;
  const blurRadius = `${((Math.random() + 0.5) * particleSize * 0.5).toFixed(1)}vmin`;
  const x = Math.random() > 0.5 ? -1 : 1;
  const boxShadow = `${particleSize * 2 * x}vmin 0 ${blurRadius} currentColor`;

  return {
    color,
    top,
    left,
    animationDuration: duration,
    animationDelay: delay,
    transformOrigin,
    boxShadow,
    zIndex: -1
  };
};
</script>

<style scoped>
main {
  padding: 2rem;
  overflow: hidden;
  position: relative;
  clip-path: inset(0);
  & *:not(.color-ball){
    z-index: 1;
  }
}
h1 {
  background: linear-gradient(to right, #9796f0, #fbc7d4); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
.color-ball {
  width: 20vmin;
  height: 20vmin;
  border-radius: 20vmin;
  backface-visibility: hidden;
  position: absolute;
  z-index: 0;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}
</style>