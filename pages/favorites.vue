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
        <details class="bg-green-200/10 rounded-sm p-3 mb-3" v-for="(favorite, index) in filteredFavorites" :key="favorite.Id">
          <summary class="flex items-center gap-2 text-xl relative pr-4">
            <svg role="presentation" aria-hidden="true" v-if="favorite.type === 'hotel'" class="h-5 w-5 text-blue-500">
              <use href="#camp"></use>
            </svg>
            <svg role="presentation" aria-hidden="true" v-else class="h-5 w-5 text-green-500">
              <use href="#pin"></use>
            </svg>
            <span>{{ favorite.Name }}</span>
            <button @click.stop="removeFavorite(favorite, index)" class="absolute right-0 top-0 cursor-pointer px-1 text-rose-500 hover:text-red-700" title="刪除">
              &times;
            </button>
          </summary>
          <div class="pt-2">
            <p><strong>類型：</strong>{{ favorite.type }}</p>
            <p><strong>地址：</strong>{{ favorite.Add }}</p>
          </div>
        </details>
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
import { ref, onMounted, nextTick } from 'vue';
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

const removeFavorite = (favorite, index) => {
  // 從 localStorage 中刪除資料
  const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const updatedFavorites = storedFavorites.filter(item => !(item.type === favorite.type && item.Id === favorite.Id));
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

  // details 消失
  const detailsElement = document.querySelectorAll('details')[index];
  if (detailsElement) {
    detailsElement.style.transition = 'height 0.3s ease, opacity 0.3s ease';
    detailsElement.style.height = `${detailsElement.offsetHeight}px`;
    detailsElement.style.opacity = '1';
    nextTick(() => {
      detailsElement.style.height = '0';
      detailsElement.style.opacity = '0';
    });
    setTimeout(() => {
      filteredFavorites.value.splice(index, 1);
    }, 300);
  }
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
details {
  overflow: hidden;
}
summary {
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>