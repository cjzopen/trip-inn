<template>
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
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  selectedHotel : String,
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
