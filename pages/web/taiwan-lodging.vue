<template>
  <div>
    <Menu />
    <main>
      <h1 class="text-center py-[5rem] text-cyan-500 text-3xl">找住宿？找景點？</h1>
      <div class="text-center pb-4">
        <button class="bg-violet-700 text-violet-50 text-xl px-5 py-2 rounded-full" type="button" @click="toggleView">{{ showHotels ? '改用景點找住宿地點' : '改用旅宿找附近景點' }}</button>
      </div>
      <HotelList v-if="showHotels" :hotels="displayHotels" :cities="cities" :selectedCity="selectedCity" :updateQuery="updateQuery" :showHotelDetails="showHotelDetails" />
      <ScenicList v-else :scenics="displayScenicSpots" :cities="cities" :selectedCity="selectedCity" :updateQuery="updateQuery" />
    </main>
    <Loading :loading="loading" />
    <Footer />
  </div>
  <MapModal v-if="selectedHotel" :selectedHotel="selectedHotel" :nearbyScenicSpots="nearbyScenicSpots" :distanceRange="distanceRange" @closeModal="closeModal" @updateNearbyScenicSpots="updateNearbyScenicSpots" />
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useServerHead } from '#imports';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
// import 'leaflet.markercluster';

import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'
import Loading from '~/components/Loading.vue'
import HotelList from '~/components/HotelList.vue'
import ScenicList from '~/components/ScenicList.vue'
import MapModal from '~/components/MapModal.vue'

const appConfig = useAppConfig();
const domainUrl = appConfig.domainUrl;

const headTitle = ref('台灣住宿資訊');
const headDescription = ref('根據政府提供的資訊，整理出台灣各地的民宿、旅店、旅館。');

useServerHead({
  title: headTitle.value,
  meta: [
    { name: 'description', content: headDescription.value },
    { property: 'og:title', content: headTitle.value },
    { property: 'og:description', content: headDescription.value },
    { property: 'og:image', content: `${domainUrl}/images/og-image.png` },
    { name: 'twitter:title', content: headTitle.value },
    { name: 'twitter:description', content: headDescription.value },
    { name: 'twitter:image', content: `${domainUrl}/images/og-image.png` },
  ]
});

const hotels = ref([]);
const allHotels = ref([]);
const loading = ref(true);
const selectedHotel = ref(null);
const selectedCity = ref('');
const cities = ref([]);
const initialLoad = ref(true);
const nearbyScenicSpots = ref([]);
const Allscenics = ref([]);
const distanceRange = ref(10);
const addressPoints = ref([]);
const showHotels = ref(true);
const hotelIconSettings = ref({
  iconUrl: new URL('/src/assets/images/taiwan-lodging/home.svg', import.meta.url).href,
  iconSize: [27, 24],
  iconAnchor: [14, 14]
});
const scenicIconSettings = ref({
  iconUrl: new URL('/src/assets/images/taiwan-lodging/pin.svg', import.meta.url).href,
  iconSize: [21, 28],
  iconAnchor: [10, 18]
});
let regionData;
let map;
let L;
let markers;

const route = useRoute();
const router = useRouter();

const filterHotels = computed(() => {
  if (!selectedCity.value) {
    return hotels.value;
  }
  return allHotels.value.filter(hotel => hotel.Region === selectedCity.value);
});

const displayHotels = computed(() => {
  if (initialLoad.value) {
    // 初始載入時，只顯示前 15 筆資料
    return hotels.value.slice(0, 15);
  }
  return filterHotels.value;
});

const displayScenicSpots = computed(() => {
  if (!selectedCity.value) {
    return Allscenics.value.slice(0, 15);
  }
  return Allscenics.value.filter(scenic => scenic.Region === selectedCity.value);
});

function toggleView() {
  showHotels.value = !showHotels.value;
  if (!selectedCity.value) {
    initialLoad.value = true;
  }
}

function shuffleArray(array, seed) {
  let m = array.length, temp, i;
  while (m) {
    i = Math.floor(randomSeed(seed) * m--);
    temp = array[m];
    array[m] = array[i];
    array[i] = temp;
    ++seed;
  }
  return array;
}

// 依日期產生亂數種子
function randomSeed(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function showHotelDetails(hotel) {
  selectedHotel.value = hotel;
  updateNearbyScenicSpots();
  setTimeout(() => {
    initializeMap(hotel.Py, hotel.Px);
  }, 0);
}

// Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 地球半徑
  // 轉換為弧度
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  // 計算距離
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  // 計算角距離
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

onMounted(async () => {
  try {
    const hotelResponse = await fetch(`${appConfig.api.hotel}`);
    const hotelData = await hotelResponse.json();
    allHotels.value = hotelData.XML_Head.Infos.Info.map(hotel => ({
      ...hotel,
      Region: hotel.Region === null ? hotel.Add.slice(0, 3) : hotel.Region,
      Pictures: [hotel.Picture1, hotel.Picture2, hotel.Picture3].filter(Boolean)
    }));

    const scenicResponse = await fetch(`${appConfig.api.scenic}`);
    const scenicData = await scenicResponse.json();
    Allscenics.value = scenicData.XML_Head.Infos.Info.map(scenic => ({
      ...scenic,
      Region: scenic.Region === null ? scenic.Add.slice(0, 3) : scenic.Region,
      Pictures: [scenic.Picture1, scenic.Picture2, scenic.Picture3].filter(Boolean)
    }));

    const todayDate = new Date().getDate();
    
    // 依日期產生亂數種子，隨機排序資料
    hotels.value = shuffleArray([...allHotels.value], todayDate);
    Allscenics.value = shuffleArray([...Allscenics.value], todayDate);
    cities.value = [...new Set(allHotels.value.map(hotel => hotel.Region))];
    if (route.query.city) {
      if (cities.value.includes(route.query.city)) {
        selectedCity.value = route.query.city;
        initialLoad.value = false;
      } else {
        // 如果 query city 比對不到資料，重置為全部
        selectedCity.value = '';
        updateQuery();
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    // loading 動畫結束後，將 loading 設為 false
    setTimeout(() => {
      loading.value = false;
    }, 1600);
  }
});

watch(selectedCity, (newCity) => {
  initialLoad.value = false;
  updateQuery();
});

function updateQuery() {
  router.push({ query: { city: selectedCity.value || undefined } });
}
</script>

<style scoped>
main {
  background-color: oklch(.21 .034 264.665);
  padding: 2rem;
}

</style>