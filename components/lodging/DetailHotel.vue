<template>
<div v-if="item">
  <h2 class="text-2xl font-bold mb-2">{{ item.Name }}</h2>
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
</div>
<div v-else>
  <p>沒有資料</p>
</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: Object,
});

// 創建一個可修改的副本
const theItem = computed(() => props.item ?? {});
// console.log(theItem.value.Serviceinfo);

// 處理 Serviceinfo
const Services = theItem.value.Serviceinfo
  ? theItem.value.Serviceinfo.split(',').filter(service => service.trim() !== '')
  : [];

// 處理 Spec，將「;」替換為「、」，並移除末尾的「、」
const formattedSpec = theItem.value.Spec
  ? theItem.value.Spec.split(';').filter(spec => spec.trim() !== '').join('、')
  : '';
</script>