<template>
  <div v-show="loading" id="loading" aria-hidden="true">
    <div class="loading-wave"></div>
    <p>載入中...</p>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    required: true
  }
});

onMounted(async () => {
  await nextTick();
  const loadingElement = document.getElementById('loading');
  const waveElement = document.querySelector('.loading-wave');
  if (loadingElement && waveElement) {
    waveElement.classList.add('active');
    await nextTick();
    loadingElement.classList.add('active');
  }
});
</script>

<style>
:root {
  --loading-bg-color: #14acc7;
  --loading-wave-size: 200vw;
  --loading-wave-border-width: 25vw;
  --loading-wave-animation-duration: 2.4s;
  --loading-wave-animation-delay: -0.4s;
}

#loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--loading-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  z-index: 9998;
  transition: transform 1s ease-out, opacity 1s ease-out;

  &.active {
    background-color: transparent;

    p {
      display: none;
    }
  }
}

.loading-wave {
  height: var(--loading-wave-size);
  width: var(--loading-wave-size);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  z-index: 9999;

  &.active {
    display: block;

    &::after,
    &::before {
      content: '';
      width: var(--loading-wave-size);
      height: var(--loading-wave-size);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: var(--loading-wave-border-width) solid color-mix(in oklch shorter hue, #C600FF 50%, var(--loading-bg-color));
      border-radius: 50%;
      animation-name: loading-wave;
      animation-duration: var(--loading-wave-animation-duration);
      animation-timing-function: cubic-bezier(0, 0.2, 0.8, 1);
      animation-iteration-count: 1;
    }

    &::after {
      border-color: color-mix(in oklch shorter hue, #C600FF 10%, var(--loading-bg-color));
      animation-delay: var(--loading-wave-animation-delay);
    }
  }
}

@keyframes loading-wave {
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 100%;
    height: 100%;
  }
}
</style>
