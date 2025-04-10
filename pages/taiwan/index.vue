<template>
  <div>
    <Menu />
    <main>
      <h1 class="text-center py-[5rem] text-cyan-500 text-4xl">找住宿？找景點？</h1>
      <div class="text-center pb-5">
        <button class="bg-violet-700 text-violet-50 text-2xl px-5 py-3 min-w-80 rounded-full cursor-pointer" type="button" @click="toggleView">{{ showHotels ? '改用景點找住宿地點' : '改用旅宿找附近景點' }}</button>
      </div>
      <div v-if="showHotels" id="hotel-area" class="pt-5">
        <!-- <h2>台灣住宿資訊</h2> -->
        <div class="text-center mb-5">
          <label for="city-select" class="bg-violet-100 text-violet-800 text-xl px-5 py-2 rounded-full">
            <select class="city-select" id="city-select" v-model="selectedCity" @change="updateQuery">
              <option value="" disabled selected>選擇縣市</option>
              <option value="">全部</option>
              <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
          </label>
        </div>
        <div>
          <ul class="grid justify-self-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            <Card v-for="hotel in displayHotels" :key="hotel.Id" :item="hotel" @click="showDetails(hotel, 'hotel')">
              <div class="title text-2xl font-bold mb-2">{{ hotel.Name }}</div>
              <p class="min-h-[48px]">{{ hotel.Add }}</p>
              <ul>
                <li>共有 {{ hotel.TotalNumberofRooms }} 間房間。</li>
                <li v-html="getPriceHtml(hotel)"></li>
              </ul>
            </Card>
          </ul>
        </div>
      </div>
      <div v-else id="scenic-area" class="pt-5">
        <!-- <h2 class="text-center text-cyan-400 text-2xl">台灣景點資訊</h2> -->
        <div class="text-center mb-5">
          <label for="scenic-city-select" class="bg-violet-100 text-violet-800 text-xl px-5 py-2 rounded-full">
            <select class="city-select" id="scenic-city-select" v-model="selectedCity" @change="updateQuery">
              <option value="" disabled selected>選擇縣市</option>
              <option value="">全部</option>
              <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
          </label>
        </div>
        <div>
          <ul class="grid justify-self-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            <Card v-for="scenic in displayScenics" :key="scenic.Id" :item="scenic" @click="showDetails(scenic, 'scenic')">
              <div class="title text-xl font-bold mb-2">{{ scenic.Name }}</div>
              <p class="min-h-[48px]">{{ scenic.Add }}</p>
            </Card>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
    <Modal :isOpen="!!selectedItem" @close="closeModal">
      <h2 class="text-2xl">{{ selectedItem?.Name }}</h2>
      <!-- <p>方圓{{ distanceRange }}公里內的{{ dataType === "hotel" ? "景點" : "旅宿" }}：</p> -->
      <!-- <input id="range-input" type="range" min="5" max="20" v-model="distanceRange" @input="updateNearbySpots" /> -->
      <div class="range-wrap" style="--min: 5;--max: 20;--val: 10;">
        <input id="range-input" type="range" min="5" max="20" list="dl" v-model="distanceRange" @input="updateNearbySpots">
        <output for="range-input">10</output>
        <label for="range-input">方圓 {{ distanceRange }} 公里內的{{ dataType === "hotel" ? "景點" : "旅宿" }}
          <!-- <div class="labels" aria-hidden="true">
            <span style="--i: 1;">1</span>
            <span style="--i: 10;">10</span>
            <span style="--i: 20;">20</span>
          </div> -->
        </label>
        <!-- <datalist id="dl">
          <option v-for="n in 20" :key="n" :value="n" :label="n % 10 === 0 ? n : undefined">{{ n }}</option>
        </datalist> -->
      </div>
      <div id="map-wrapper">
        <div id="map"></div>
      </div>
      <div id="description">
        <component :is="isHotel ? 'DetailHotel' : 'DetailScenic'" :item="selectedItem" />
      </div>
      <!-- <ul>
        <li v-for="spot in nearbySpots" :key="spot.Id">
          {{ spot.Region }}：{{ spot.Name }}
        </li>
      </ul> -->
    </Modal>
  
  <!-- <client-only> -->
    <Loading :loading="loading" />
  <!-- </client-only> -->
</template>

<script setup>
import { ref, onMounted, computed, watch, createApp, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useServerHead } from '#imports';
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/swiper-bundle.css';
import '~/src/lib/leaflet/leaflet.1.9.4.css';
import '~/src/lib/leaflet/markercluster.1.5.3.css';
import '~/src/lib/leaflet/markercluster.default.1.5.3.css';
import '~/src/assets/css/trip.css';

import Menu from '~/components/Menu.vue';
import Footer from '~/components/Footer.vue';
import Loading from '~/components/Loading.vue';
import Modal from '~/components/Modal.vue';
import Card from '~/components/Card.vue';
import DetailHotel from '~/components/lodging/DetailHotel.vue';
import DetailScenic from '~/components/lodging/DetailScenic.vue';

const appConfig = useAppConfig();
const domainUrl = appConfig.domainUrl;

const headTitle = ref('台灣住宿與景點資訊');
const headDescription = ref('根據政府提供的資訊，從景點附近整理出台灣各地的民宿、旅店、旅館。');

useServerHead({
  title: headTitle.value,
  meta: [
    { name: 'description', content: headDescription.value },
    { property: 'og:title', content: headTitle.value },
    { property: 'og:description', content: headDescription.value },
    { property: 'og:image', content: `${domainUrl}/images/taiwan/og.jpg` },
    { name: 'twitter:title', content: headTitle.value },
    { name: 'twitter:description', content: headDescription.value },
    { name: 'twitter:image', content: `${domainUrl}/images/taiwan/og.jpg` },
  ],
  link: [
    { rel: 'canonical', href: `${domainUrl}/taiwan` },
    // { rel: 'stylesheet', href: `${domainUrl}/lib/leaflet/leaflet.1.9.4.css` },
    // { rel: 'stylesheet', href: `${domainUrl}/lib/leaflet/markercluster.1.5.3.css` },
    // { rel: 'stylesheet', href: `${domainUrl}/lib/leaflet/markercluster.default.1.5.3.css` },
    // { rel: 'stylesheet', href: `${domainUrl}/css/trip.css` },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: `{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "旅遊小站",
        "item": "${domainUrl}/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "台灣",
        "item": "${domainUrl}/taiwan"
      }]
    }`
    }
  ]
});

const hotels = ref([]);
const allHotels = ref([]);
const allScenics = ref([]);
const loading = ref(true);
const selectedCity = ref('');
const cities = ref([]);
const initialLoad = ref(true);
const selectedHotel = ref(null);
const selectedScenic = ref(null);
const selectedItem = ref(null);
const dataType = ref('');
const nearbyScenicSpots = ref([]);
const nearbySpots = ref([]);
const distanceRange = ref(10);
const addressPoints = ref([]);
const showHotels = ref(true);
const isHotel = ref(true);
// const mapClickTarget = ref([]);
const hotelIconSettings = ref({
  // iconUrl: new URL('/src/assets/images/taiwan/home.svg', import.meta.url).href,
  iconUrl: `${domainUrl}/images/taiwan/home.svg`,
  iconSize: [27, 24],
  iconAnchor: [14, 14]
});
const scenicIconSettings = ref({
  // iconUrl: new URL('/src/assets/images/taiwan/pin.svg', import.meta.url).href,
  iconUrl: `${domainUrl}/images/taiwan/pin.svg`,
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

const displayScenics = computed(() => {
  if (!selectedCity.value) {
    return allScenics.value.slice(0, 15);
  }
  return allScenics.value.filter(scenic => scenic.Region === selectedCity.value);
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

function updateNearbySpots() {
  if (!selectedItem.value) return;

  // 根據 dataType 選擇要篩選的資料類型
  const isHotel = dataType.value === "hotel";
  const sourceList = isHotel ? allScenics.value : allHotels.value;

  // 計算符合範圍內的目標
  nearbySpots.value = sourceList.filter(spot => {
    const distance = calculateDistance(selectedItem.value.Py, selectedItem.value.Px, spot.Py, spot.Px);
    return distance <= distanceRange.value;
  });

  // 更新地圖標記
  addressPoints.value = nearbySpots.value.map(spot => [spot.Py, spot.Px, { name: spot.Name }]);
  updateMap();
}

function showDetails(item, type) {
  selectedItem.value = item;
  dataType.value = type; // hotel 或 scenic
  updateNearbySpots();

  nextTick(() => {
    initializeMap(item.Py, item.Px);
  });
}

function closeModal() {
  selectedItem.value = null;
}

async function initializeMap(lat, lon) {
  if (!L) {
    L = await import('leaflet').then(module => module.default);
  }
  if (!markers) {
    await import('leaflet.markercluster');
  }
  if (map) {
    map.remove();
  }

  const isHotel = dataType.value === "hotel";
  const mainIcon = isHotel ? L.icon(hotelIconSettings.value) : L.icon(scenicIconSettings.value);
  const nearbyIcon = isHotel ? L.icon(scenicIconSettings.value) : L.icon(hotelIconSettings.value);

  map = L.map('map').setView([lat, lon], 13);
  let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  tiles.addTo(map);

  // 新增當前選中的主標記（飯店或景點）
  L.marker([lat, lon], { icon: mainIcon }).addTo(map)
    .bindPopup(selectedItem.value.Name)
    .openPopup();

  // 加入附近的相反類型標記（飯店找景點 or 景點找飯店）
  addNearbyMarkers(nearbyIcon, isHotel);
}

async function updateMap() {
  if (!L) {
    L = await import('leaflet').then(module => module.default);
  }
  if (!markers) {
    await import('leaflet.markercluster');
  }
  if (!map) return;

  // 移除舊的標記
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  if (!selectedItem.value) return;

  const isHotel = dataType.value === "hotel";
  const mainIcon = isHotel ? L.icon(hotelIconSettings.value) : L.icon(scenicIconSettings.value);
  const nearbyIcon = isHotel ? L.icon(scenicIconSettings.value) : L.icon(hotelIconSettings.value);

  // 加入目前選中的標記
  L.marker([selectedItem.value.Py, selectedItem.value.Px], { icon: mainIcon }).addTo(map)
    .bindPopup(selectedItem.value.Name)
    .openPopup();

  // 加入附近的標記
  addNearbyMarkers(nearbyIcon, isHotel);
}

function addNearbyMarkers(icon, isHotel) {
  if (!map || !nearbySpots.value.length) return;

  const markerClusterGroup = L.markerClusterGroup();

  nearbySpots.value.forEach(spot => {
    const marker = L.marker([spot.Py, spot.Px], { icon });

    marker.on('click', () => {
      const mapTarget = document.querySelector('#description');
      if (mapTarget) {
        // 插入 DetailHotel.vue 或 DetailScenic.vue
        // mapClickTarget.value = spot;
        // console.log(mapClickTarget.value);
        const ComponentInDscription = isHotel ? DetailScenic : DetailHotel;
        const caeateDetail = createApp(ComponentInDscription, { item: spot });
          // console.log(selectedItem);
        caeateDetail.mount(mapTarget);
      }
    });

    markerClusterGroup.addLayer(marker);
  });

  map.addLayer(markerClusterGroup);
}



onMounted(async () => {
  try {
    const hotelResponse = await fetch(`${appConfig.api.hotel}`);
    const hotelData = await hotelResponse.json();
    allHotels.value = hotelData.XML_Head.Infos.Info.map(hotel => ({
      ...hotel,
      Region: hotel.Region === null ? hotel.Add.slice(0, 3) : hotel.Region,
      Pictures: [hotel.Picture1, hotel.Picture2, hotel.Picture3].filter(Boolean),
      PicDescribes: [hotel.Picdescribe1, hotel.Picdescribe2, hotel.Picdescribe3].filter(Boolean)
    }));

    const scenicResponse = await fetch(`${appConfig.api.scenic}`);
    const scenicData = await scenicResponse.json();
    allScenics.value = scenicData.XML_Head.Infos.Info.map(scenic => ({
      ...scenic,
      Region: scenic.Region === null ? scenic.Add.slice(0, 3) : scenic.Region,
      Pictures: [scenic.Picture1, scenic.Picture2, scenic.Picture3].filter(Boolean),
      PicDescribes: [scenic.Picdescribe1, scenic.Picdescribe2, scenic.Picdescribe3].filter(Boolean)
    }));

    const todayDate = new Date().getDate();
    
    // 依日期產生亂數種子，隨機排序資料
    hotels.value = shuffleArray([...allHotels.value], todayDate);
    allScenics.value = shuffleArray([...allScenics.value], todayDate);
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

  // range input
  // const _R = ref(null);
  // const _W = ref(null);
  // const _O = ref(null);
  // nextTick(() => {
    // _R.value = document.querySelector('#range-input');
    // _W.value = _R.value.parentNode;
    // _O.value = _R.value.nextElementSibling;

    // document.documentElement.classList.add('js');

    // _R.value.addEventListener('input', e => {
      // _O.value.value = _R.value.value;
      // _W.value.style.setProperty('--val', +_R.value.value);
    // }, false);
  // });
});

watch(selectedCity, (newCity) => {
  initialLoad.value = false;
  updateQuery();
});

function updateQuery() {
  router.push({ query: { city: selectedCity.value || undefined } });
}

// 旅宿價格顏色
const priceClass = (price) => {
  if (price < 3000) return 'text-emerald-500';
  if (price > 9000) return 'text-pink-700';
  return '';
};

// 獲取價格 HTML
// const getPriceHtml = (hotel) => {
//   if (hotel.LowestPrice === hotel.CeilingPrice) {
//     return `價位：<span class="${priceClass(hotel.CeilingPrice)}">${hotel.CeilingPrice}</span>。`;
//   }
//   return `價位：<span class="${priceClass(hotel.LowestPrice)}">${hotel.LowestPrice}</span> ~ <span class="${priceClass(hotel.CeilingPrice)}">${hotel.CeilingPrice}</span>。`;
// };
const getPriceHtml = (hotel) => {
  const { LowestPrice, CeilingPrice } = hotel;
  const priceText = LowestPrice === CeilingPrice
    ? `<span class="${priceClass(CeilingPrice)}">${CeilingPrice}</span>`
    : `<span class="${priceClass(LowestPrice)}">${LowestPrice}</span> ~ <span class="${priceClass(CeilingPrice)}">${CeilingPrice}</span>`;
  return `價位：${priceText}。`;
};
</script>
<style>
.card{
  position: relative;
  cursor: pointer;
  &:hover{
    /* transform: scale(1.02); */
    /* transition: all .3s ease-in-out; */
    animation: float 3s infinite;
  }
}
.card .figure {
  background-color: var(--slate-800);
  & img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
.card .geo-label{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: #fff;
  border-radius: .4375rem 0 .3125rem 0;
  box-shadow: 0 .0625rem .125rem rgba(0, 0, 0, .1);
  color: #3c4043;
  display: inline-flex;
  margin-bottom: .25rem;
  margin-right: .25rem;
  padding: .1875rem .5rem .125rem;
  vertical-align: top;
  font-size: .75rem;
}
.geo-label-icon{
  fill: currentColor;
  height: .5625rem;
  left: .0625rem;
  margin-right: .125rem;
  position: relative;
  top: .25rem;
  width: .5625rem;
}
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-0.25rem); }
  100% { transform: translateY(0); }
}
main {
  background-color: oklch(.21 .034 264.665);
  padding: 2rem;
}
.city-select{
  outline: none;
  &:focus{
    outline: none;
  }
}
#map-wrapper{
  position: relative;
  width: calc(100% - 60px);
  margin-bottom: 1rem;
}
#map {
  width: 100%;
  height: 400px;
  max-height: 40vh;
}

#range-input {
  flex: 1;
  margin: 0;
  padding: 0;
  min-height: 1.5em;
  background: transparent;
  font: inherit;
  -webkit-appearance: none;
  appearance: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -0.625em;
  }
  &::-webkit-slider-runnable-track,
  &::-moz-range-track,
  &::-ms-track {
    box-sizing: border-box;
    border: none;
    width: 12.5em;
    height: 0.25em;
    background: #ccc;
  }
  &::-webkit-slider-thumb,
  &::-moz-range-thumb,
  &::-ms-thumb {
    box-sizing: border-box;
    border: none;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: #f90;
  }
  &::-ms-tooltip {
    display: none;
  }
  & ~ output {
    display: none;
  }
}
.js #range-input ~ output {
  display: block;
  position: absolute;
  left: 0.75em;
  top: 0;
  padding: 0.25em 0.5em;
  border-radius: 3px;
  transform: translate(calc((var(--val) - var(--min))/(var(--max) - var(--min))*12.5em - 50%));
  background: #95a;
  color: #eee;
}

.range-wrap {
  font-size: 1rem;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: 14rem;
  height: 5.25rem;
  color: #ccc;
}
#range-input, #range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
}
#range-input::-webkit-slider-runnable-track {
  box-sizing: border-box;
  border: none;
  width: 14em;
  height: 0.25em;
  background: #ccc;
}
#range-input::-moz-range-track {
  box-sizing: border-box;
  border: none;
  width: 14em;
  height: 0.25em;
  background: #ccc;
}
#range-input::-ms-track {
  box-sizing: border-box;
  border: none;
  width: 14em;
  height: 0.25em;
  background: #ccc;
}
#range-input::-webkit-slider-thumb {
  margin-top: -0.625em;
  box-sizing: border-box;
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: #ccc;
}
#range-input::-moz-range-thumb {
  box-sizing: border-box;
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: #ccc;
}
#range-input::-ms-thumb {
  margin-top: 0;
  box-sizing: border-box;
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: #ccc;
}
#range-input::-ms-tooltip {
  display: none;
}
#range-input:focus {
  outline: none;
}
#range-input:focus::-webkit-slider-thumb {
  background: #f90;
}
#range-input:focus::-moz-range-thumb {
  background: #f90;
}
#range-input:focus::-ms-thumb {
  background: #f90;
}
#range-input:focus ~ label span {
  color: #95a;
}
#range-input ~ label {
  color: #333;
}
#range-input ~ label span {
  color: #ccc;
}

.labels {
  position: absolute;
  bottom: 1.5em;
  left: 0.75em;
}
.labels span {
  position: absolute;
  left: calc(var(--i)*10px);
  transform: translate(-50%) scale(0.9);
  font-weight: 700;
}
.model-photos{
  display: flex;
  gap: 5px;
  & > figure{
    width: 25%;
    max-width: 200px;
    aspect-ratio: 1 / 1;
  }
  & img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}
.list-disc{
  padding-inline-start: 22px;
}
.heart-icon::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(0);
  opacity: 0;
  animation: none;
}
.heart-icon.animate::before {
  animation: expand-fade .3s ease-out;
}
@keyframes expand-fade {
  from {
    transform: scale(1);
    opacity: 0.2;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}
</style>