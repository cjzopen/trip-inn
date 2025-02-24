<template>
  <div>
    <h2>台灣住宿資訊</h2>
    <div>
      <label for="city-select">選擇縣市：</label>
      <select id="city-select" v-model="selectedCity" @change="updateQuery">
        <option value="" disabled selected>選擇縣市</option>
        <option value="">全部</option>
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
    </div>
    <div>
      <ul class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
        <li v-for="hotel in displayHotels" :key="hotel.Id" class="card overflow-hidden rounded-xl bg-white shadow-md max-w-[480px] lg:flex" @click="showHotelDetails(hotel)">
          <figure class="shrink-0 lg:w-[200px] *:w-full">
            <template v-if="hotel.Pictures.length > 0">
              <img :src="hotel.Pictures[0]" :alt="hotel.Name" />
            </template>
            <template v-else>
              <img src="https://picsum.photos/400/260" alt="default image" />
            </template>
          </figure>
          <div>
            <p>{{ hotel.Region }}</p>
            <p>{{ hotel.Name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  selectedHotel : Object,
  hotels: Array,
  cities: Array,
  selectedCity: String,
  updateQuery: Function,
  showHotelDetails: Function
});

const selectedCity = ref(props.selectedCity);

const filterHotels = computed(() => {
  if (!selectedCity.value) {
    return props.hotels;
  }
  return props.hotels.filter(hotel => hotel.Region === selectedCity.value);
});

const displayHotels = computed(() => {
  return filterHotels.value;
});
</script>
