<template>
  <div>
    <h2>台灣景點資訊</h2>
    <div>
      <label for="scenic-city-select">選擇縣市：</label>
      <select id="scenic-city-select" v-model="selectedCity" @change="updateQuery">
        <option value="" disabled selected>選擇縣市</option>
        <option value="">全部</option>
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
    </div>
    <div>
      <ul class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
        <li v-for="scenic in displayScenicSpots" :key="scenic.Id" class="card overflow-hidden rounded-xl bg-white shadow-md max-w-[480px] lg:flex">
          <figure class="shrink-0 lg:w-[200px] *:w-full">
            <template v-if="scenic.Pictures.length > 0">
              <img :src="scenic.Pictures[0]" :alt="scenic.Name" />
            </template>
            <template v-else>
              <img src="https://picsum.photos/400/260" alt="default image" />
            </template>
          </figure>
          <div>
            <p>{{ scenic.Name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  scenics: Array,
  cities: Array,
  selectedCity: String,
  updateQuery: Function
});

const selectedCity = ref(props.selectedCity);

const filterScenicSpots = computed(() => {
  if (!selectedCity.value) {
    return props.scenics;
  }
  return props.scenics.filter(scenic => scenic.Region === selectedCity.value);
});

const displayScenicSpots = computed(() => {
  return filterScenicSpots.value;
});
</script>
