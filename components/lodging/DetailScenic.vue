<template>
  <div v-if="item">
    <h3>{{ item.Name }}</h3>
    <address>{{ item.Add }}</address>
    <p>{{ item.Toldescribe || '沒有描述' }}</p>
  </div>
  <div v-else>
    <p>沒有資料</p>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  // item: {
  //   type: Object,
  //   required: true,
  // },
});
</script>