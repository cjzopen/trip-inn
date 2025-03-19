<script setup>
defineProps({
  item: Object, 
});
// const defaultImg = new URL('/public/images/default.webp', import.meta.url).href;
const appConfig = useAppConfig();
const domainUrl = appConfig.domainUrl;
// 定義可以發出的 click 事件
const emit = defineEmits(['click']); 
</script>

<template>
  <li class="card overflow-hidden rounded-xl bg-white shadow-md max-w-[480px] lg:flex" @click="emit('click', item)">
    <span class="geo-label" aria-hidden="true">
      <svg class="geo-label-icon" role="presentation" aria-hidden="true">
        <use href="#pin"></use>
      </svg>
      {{ item.Region }}{{ item.Town }}
    </span>
    <figure class="figure shrink-0 w-full h-48 lg:w-[200px] lg:h-[200px] *:w-full *:h-full">
      <img :src="item.Pictures[0] || `${domainUrl}/images/default.webp`" :alt="item.Name" />
    </figure>
    <div class="p-2">
      <slot></slot>
    </div>
  </li>
</template>

<style scope>
.card{
  position: relative;
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
</style>