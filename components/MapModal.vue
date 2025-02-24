<template>
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
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  selectedHotel: Object,
  nearbyScenicSpots: Array,
  distanceRange: Number,
  updateNearbyScenicSpots: Function,
  closeModal: Function
});

const distanceRange = ref(props.distanceRange);
let map;
let L;
let markers;

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
  if (props.selectedHotel) {
    props.nearbyScenicSpots.value = props.Allscenics.value.filter(scenic => {
      const distance = calculateDistance(props.selectedHotel.Py, props.selectedHotel.Px, scenic.Py, scenic.Px);
      return distance <= distanceRange.value;
    });
    props.addressPoints.value = props.nearbyScenicSpots.value.map(scenic => [scenic.Py, scenic.Px, { name: scenic.Name }]);
    updateMap();
  }
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
  const hotelIcon = L.icon({
    iconUrl: new URL('/src/assets/images/taiwan-lodging/home.svg', import.meta.url).href,
    iconSize: [27, 24],
    iconAnchor: [14, 14]
  });
  const scenicIcon = L.icon({
    iconUrl: new URL('/src/assets/images/taiwan-lodging/pin.svg', import.meta.url).href,
    iconSize: [21, 28],
    iconAnchor: [10, 18]
  });
  map = L.map('map').setView([lat, lon], 13);
  let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  tiles.addTo(map);
  L.marker([lat, lon], { icon: hotelIcon }).addTo(map)
    .bindPopup(props.selectedHotel.Name)
    .openPopup();
  addScenicMarkers(scenicIcon);
}

async function updateMap() {
  if (!L) {
    L = await import('leaflet').then(module => module.default);
  }
  if (!markers) {
    await import('leaflet.markercluster');
  }
  if (map) {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    const hotelIcon = L.icon({
      iconUrl: new URL('/src/assets/images/taiwan-lodging/home.svg', import.meta.url).href,
      iconSize: [27, 24],
      iconAnchor: [14, 14]
    });
    L.marker([props.selectedHotel.Py, props.selectedHotel.Px], { icon: hotelIcon }).addTo(map)
      .bindPopup(props.selectedHotel.Name)
      .openPopup();
    const scenicIcon = L.icon({
      iconUrl: new URL('/src/assets/images/taiwan-lodging/pin.svg', import.meta.url).href,
      iconSize: [21, 28],
      iconAnchor: [10, 18]
    });
    addScenicMarkers(scenicIcon);
  }
}

function addScenicMarkers(scenicIcon) {
  const markerClusterGroup = L.markerClusterGroup();
  props.nearbyScenicSpots.forEach(scenic => {
    const marker = L.marker([scenic.Py, scenic.Px], { icon: scenicIcon }).bindPopup(scenic.Name);
    markerClusterGroup.addLayer(marker);
  });
  map.addLayer(markerClusterGroup);
}

watch(() => props.selectedHotel, (newHotel) => {
  if (newHotel) {
    nextTick(() => {
      initializeMap(newHotel.Py, newHotel.Px);
    });
  }
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css');

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
