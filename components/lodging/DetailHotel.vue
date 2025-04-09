<template>
<div v-if="item">
  <h2 class="text-2xl font-bold mb-2">{{ item.Name }}</h2>
  <div class="relative w-8 h-8 my-1">
    <button 
      @click="toggleFavorite($event)" 
      class="heart-icon w-8 h-8 bg-transparent rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 focus:outline-none" 
      aria-label="加入收藏" 
      :data-id="item.Id">
      <svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="h-6 w-6"
        :class="{ 'text-rose-500': isFavorite, 'text-gray-300': !isFavorite, 'fill-rose-500': isFavorite, 'fill-gray-300': !isFavorite }">
        <use href="#heart" />
      </svg>
    </button>
  </div>
  <address>{{ item.Add }}</address>
  <div class="model-photos flex">
    <figure v-for="(picture, index) in item.Pictures">
      <a :href="picture" target="_blank" rel="noopener noreferrer">
        <img :key="index" :src="picture" :alt="item.PicDescribes[index] || '業主提供的住宿環境照片'" :title="item.PicDescribes[index] || ''" />
      </a>
    </figure>
  </div>
  <p class="mb-2">{{ item.Description || '' }}</p>
  <template v-if="item?.LowestPrice">
    <p class="mb-2" v-if="item.LowestPrice === item.CeilingPrice">價位：{{ item.CeilingPrice }} 元。</p>
    <p class="mb-2" v-else>價位：{{ item.LowestPrice }} ~ {{ item.CeilingPrice }} 元。</p>
  </template>
  <p class="mb-2">房間數：{{ item?.TotalNumberofRooms }}</p>
  <p v-if="formattedSpec" class="mb-2">特殊房型與價格：{{ formattedSpec }}</p>
  <template v-if="item?.Serviceinfo">
    <h3 class="text-lg font-bold">服務：</h3>
    <ul class="list-disc mb-2">
      <li v-for="(service, index) in Services" :key="index">{{ service }}</li>
    </ul>
  </template>
  <p v-if="item?.Tel">電話：{{ item.Tel }}</p>
  <p v-if="item?.IndustryEmail">Email：{{ item.IndustryEmail }}</p>
  <p class="mb-2" v-if="item?.Website"><a class="text-sky-600" :href="item.Website" target="_blank" rel="noopener noreferrer">商家網站</a></p>
</div>
<div v-else>
  <p>沒有資料</p>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  item: Object,
});

// 創建一個可修改的副本
const theItem = computed(() => props.item ?? {});
const isFavorite = ref(false);

// 初始化時檢查是否已收藏
onMounted(() => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  isFavorite.value = favorites.some(favorite => favorite.type === 'hotel' && favorite.Id === item.Id);
});

// 處理 Serviceinfo
const Services = theItem.value.Serviceinfo
  ? theItem.value.Serviceinfo.split(',').filter(service => service.trim() !== '')
  : [];

// 處理 Spec，將「;」替換為「、」，並移除末尾的「、」
const formattedSpec = theItem.value.Spec
  ? theItem.value.Spec.split(';').filter(spec => spec.trim() !== '').join('、')
  : '';

// 收藏/取消收藏功能
const toggleFavorite = (event) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const itemId = event.currentTarget.getAttribute('data-id');
  const button = event.currentTarget;

  if (isFavorite.value) {
    // 如果已收藏，則刪除
    const updatedFavorites = favorites.filter(favorite => !(favorite.type === 'hotel' && favorite.Id === itemId));
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    isFavorite.value = false;
  } else {
    // 如果未收藏，則新增
    favorites.push({ ...theItem.value, type: 'hotel' });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    isFavorite.value = true;

    // 動畫效果
    button.classList.add('animate');
    setTimeout(() => {
      button.classList.remove('animate');
    }, 300);
  }
};
</script>