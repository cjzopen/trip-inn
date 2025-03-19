<template>
<div v-if="item">
  <h2 class="text-2xl font-bold mb-2">{{ item.Name }}</h2>
  <address>{{ item.Add }}</address>
  <div class="model-photos flex">
    <figure v-for="(picture, index) in item.Pictures">
      <a :href="picture" target="_blank" rel="noopener noreferrer">
        <img :key="index" :src="picture" :alt="item.PicDescribes[index] || item.Name" :title="item.PicDescribes[index] || ''" />
      </a>
    </figure>
  </div>
  <p class="mb-2">{{ item.Toldescribe || '' }}</p>
  <p class="mb-2" v-if="item?.Opentime">開放時間：{{ item.Opentime }}</p>
  <p class="mb-2" v-if="item?.Ticketinfo">入場費：{{ item.Ticketinfo }}</p>
  <p class="mb-2" v-if="item?.Travellinginfo">大眾交通資訊：{{ item.Travellinginfo }}</p>
  <p class="mb-2" v-if="item?.Parkinginfo">停車資訊：{{ item.Parkinginfo }}</p>
  <p class="mb-2" v-if="item?.Tel">電話：{{ item.Tel }}</p>
  <p class="mb-2" v-if="item?.Website"><a :href="item.Website" target="_blank" rel="noopener noreferrer">官方網站</a></p>
  <p class="mb-2" v-if="item?.Remarks">注意事項：{{ item.Remarks }}</p>
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