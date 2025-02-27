<script setup>
defineProps({
  item: Object, 
});
// 定義可以發出的 click 事件
const emit = defineEmits(['click']); 
</script>

<template>
  <li class="card overflow-hidden rounded-xl bg-white shadow-md max-w-[480px] lg:flex" @click="emit('click', item)">
    <figure class="figure shrink-0 w-full h-48 lg:w-[200px] lg:h-[200px] *:w-full *:h-full">
      <img :src="item.Pictures[0] || 'https://picsum.photos/400/260'" :alt="item.Name" />
    </figure>
    <div class="p-2">
      <slot></slot>
    </div>
  </li>
</template>