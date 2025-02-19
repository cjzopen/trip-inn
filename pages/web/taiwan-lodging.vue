<template>
  <div>
    <Menu />
    <main>
      <h1 class="py-[5rem] text-(--main-color) text-3xl">找住宿？找景點？</h1>
      <div>
        <button type="button" @click="toggleView">{{ showHotels ? '用景點找住宿地點' : '用旅宿找附近的景點' }}</button>
      </div>
      <div v-if="showHotels" id="hotel-area">
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
            <li v-for="hotel in displayHotels" :key="hotel.Id" class="overflow-hidden rounded-xl bg-white shadow-md max-w-[480px] lg:flex" @click="showHotelDetails(hotel)">
              <figure class="shrink-0 lg:w-[200px] *:w-full">
                <template v-if="hotel.Pictures.length > 0">
                  <img :src="hotel.Pictures[0]" :alt="hotel.Name" />
                </template>
                <template v-else>
                  <img src="https://picsum.photos/400/260" alt="default image" />
                </template>
              </figure>
              <div>
                <p>{{ hotel.Name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else id="scenic-area">
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
            <li v-for="scenic in displayScenicSpots" :key="scenic.Id" class="overflow-hidden rounded-xl bg-white shadow-md max-w-[480px] lg:flex">
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
    </main>
    <Loading :loading="loading" />
    <Footer />
  </div>
  <div v-if="selectedHotel" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ selectedHotel.Name }}</h2>
      <h3>方圓{{ distanceRange }}公里內的景點：</h3>
      <input type="range" min="5" max="20" v-model="distanceRange" @input="updateNearbyScenicSpots" />
      <div id="map-wrapper">
        <div id="map"></div>
      </div>
      <ul>
        <li v-for="scenic in nearbyScenicSpots" :key="scenic.Id">{{ scenic.Region }}：{{ scenic.Name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useServerHead } from '#imports';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'
import Loading from '~/components/Loading.vue'

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
const selectedCity = ref('');
const cities = ref([]);
const initialLoad = ref(true);
const selectedHotel = ref(null);
const nearbyScenicSpots = ref([]);
const scenicData = ref([]);
const distanceRange = ref(10);
const addressPoints = ref([]);
const showHotels = ref(true);
const hotelIconSettings = ref({
  iconUrl: new URL('/assets/images/taiwan-lodging/home.svg', import.meta.url).href,
  iconSize: [27, 24],
  iconAnchor: [14, 14]
});
const scenicIconSettings = ref({
  iconUrl: new URL('/assets/images/taiwan-lodging/pin.svg', import.meta.url).href,
  iconSize: [21, 28],
  iconAnchor: [10, 18]
});
let map;
let L;

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
    return scenicData.value.slice(0, 15);
  }
  return scenicData.value.filter(scenic => scenic.Region === selectedCity.value);
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

function updateNearbyScenicSpots() {
  if (selectedHotel.value) {
    nearbyScenicSpots.value = scenicData.value.filter(scenic => {
      const distance = calculateDistance(selectedHotel.value.Py, selectedHotel.value.Px, scenic.Py, scenic.Px);
      return distance <= distanceRange.value;
    });
    addressPoints.value = nearbyScenicSpots.value.map(scenic => [scenic.Py, scenic.Px, { name: scenic.Name }]);
    updateMap();
  }
}

function showHotelDetails(hotel) {
  selectedHotel.value = hotel;
  updateNearbyScenicSpots();
  setTimeout(() => {
    initializeMap(hotel.Py, hotel.Px);
  }, 0);
}

function closeModal() {
  selectedHotel.value = null;
}

async function initializeMap(lat, lon) {
  if (!L) {
    L = await import('leaflet').then(module => module.default);
  }
  if (map) {
    map.remove();
  }
  const hotelIcon = L.icon(hotelIconSettings.value);
  const scenicIcon = L.icon(scenicIconSettings.value);
  map = L.map('map').setView([lat, lon], 13);
  let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  tiles.addTo(map);
  L.marker([lat, lon], { icon: hotelIcon }).addTo(map)
    .bindPopup(selectedHotel.value.Name)
    .openPopup();
  addScenicMarkers(scenicIcon);
}

async function updateMap() {
  if (!L) {
    L = await import('leaflet').then(module => module.default);
  }
  if (map) {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    const hotelIcon = L.icon(hotelIconSettings.value);
    L.marker([selectedHotel.value.Py, selectedHotel.value.Px], { icon: hotelIcon }).addTo(map)
      .bindPopup(selectedHotel.value.Name)
      .openPopup();
    const scenicIcon = L.icon(scenicIconSettings.value);
    addScenicMarkers(scenicIcon);
  }
}

function addScenicMarkers(scenicIcon) {
  nearbyScenicSpots.value.forEach(scenic => {
    L.marker([scenic.Py, scenic.Px], { icon: scenicIcon }).addTo(map)
      .bindPopup(scenic.Name);
  });
}

onMounted(async () => {
  try {
    const hotelResponse = await fetch(`${appConfig.api.hotel}`);
    const hotelData = await hotelResponse.json();
    allHotels.value = hotelData.XML_Head.Infos.Info.map(hotel => ({
      ...hotel,
      Pictures: [hotel.Picture1, hotel.Picture2, hotel.Picture3].filter(Boolean)
    }));

    const scenicResponse = await fetch(`${appConfig.api.scenic}`);
    const scenicApiData = await scenicResponse.json();
    scenicData.value = scenicApiData.XML_Head.Infos.Info.map(scenic => ({
      ...scenic,
      Pictures: [scenic.Picture1, scenic.Picture2, scenic.Picture3].filter(Boolean)
    }));

    const todayDate = new Date().getDate();
    
    // 依日期產生亂數種子，隨機排序資料
    hotels.value = shuffleArray([...allHotels.value], todayDate);
    scenicData.value = shuffleArray([...scenicData.value], todayDate);
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css');
main {
  background-color: oklch(.21 .034 264.665);
  padding: 2rem;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 96vw;
  max-width: 1400px;
  max-height: 90vh;
  overflow-y: auto;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.close::after{
  content: '';
  clear: both;
}
#map-wrapper{
  position: relative;
  max-width: 800px;
}
#map {
  width: 100%;
  height: 400px;
  max-height: 40vh;
}

</style>