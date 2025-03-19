<template>
  <div>
    <Menu />
    <main class="bg-sky-900 bg-linear-to-bl from-sky-900 to-purple-300">
      <div class="wrapper p-4">
        <div class="text-center flex justify-center items-center h-full">
          <div class="pb-[15cqh]">
            <h1 class="text-center py-[2rem] text-sky-400 text-5xl">旅遊住宿地點查詢</h1>
            <p class="text-sky-400">用景點尋找附近合適的旅宿，或是用旅宿查看附近有哪些知名景點</p>
          </div>
        </div>
      </div>
      <video
        v-if="showVideo"
        src="/video/hiking.webm"
        autoplay
        muted
        loop
        playsinline
        poster="/images/hiking.webp"
        class="background-video"
      ></video>
      <img v-else src="/images/hiking.webp" alt="*" class="background-image" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useServerHead } from '#imports';
import { ref, onMounted } from 'vue';
import Menu from '~/components/Menu.vue';
import Footer from '~/components/Footer.vue';

const appConfig = useAppConfig();
const domainUrl = appConfig.domainUrl;

const videoSrc = '/video/hiking.webm'; // 影片 URL
const fallbackImage = '/images/hiking.webp'; // 替換成你的圖片 URL

const showVideo = ref(false);

useServerHead({
  link: [
    { rel: 'canonical', href: `${domainUrl}/` },
  ],
});

// 檢查瀏覽器是否支援 WebM
const checkVideoSupport = () => {
  const video = document.createElement('video');
  return video.canPlayType('video/webm') !== '';
};

// 檢查是否為行動裝置
const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

// 檢查裝置是否連接 WiFi
const checkWiFi = () => {
  if (!navigator.connection) return false;
  return navigator.connection.effectiveType === 'wifi';
};

// 初始化判斷
onMounted(async () => {
  const supportsWebM = checkVideoSupport();
  const isOnWiFi = await checkWiFi();

  // PC 只要支援 WebM 就播放
  // 行動裝置則需要 WiFi 才播放
  showVideo.value = supportsWebM && (!isMobile() || isOnWiFi);
});
</script>

<style scoped>
main {
  padding: 2rem;
  overflow: hidden;
  position: relative;
  height: calc(100dvh - 56px);
  overflow: hidden;
  & *:not(.background-video,.background-image){
    z-index: 1;
  }
}
.wrapper{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .1);
  container-type: inline-size;
}
h1 {
  background: linear-gradient(to right, #9796f0, #fbc7d4); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.background-video,
.background-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>