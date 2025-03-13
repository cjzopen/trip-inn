<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-wrapper">
      <!-- <div class="colse-wrapper"> -->
        <span class="close" @click="$emit('close')">&times;</span>
      <!-- </div> -->
      <div class="model-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean
});

</script>

<style scoped>
.modal {
  --model-padding: 1rem;
  --model-height: calc(99dvh - 4rem);
  --close-height: 40px;
  display: block;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,.4);
}

.modal-wrapper {
  position: relative;
  background-color: #fafaf1;
  margin: 2rem auto;
  /* border: 1px solid #888; */
  border-radius: 6px;
  width: 96vw;
  max-width: 1400px;
  max-height: var(--model-height);
  /* overflow-y: auto; */
  overflow: hidden;
}
.model-content {
  position: relative;
  /* top: calc(var(--close-height) * -1); */
  padding: var(--model-padding);
  height: 100%;
  max-height: var(--model-height);
  overflow-y: overlay;
}
/* .colse-wrapper{
  padding-block: var(--model-padding);
  padding-inline: calc(var(--model-padding) * 2);
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
  position: sticky;
  right: 0;
  top: 0;
  height: var(--close-height);
} */
.close {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--close-height);
  height: var(--close-height);
  background-color: #fefefe;
  box-shadow: 0 0 0 2px #787768;
  border-radius: 50%;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  right: calc(var(--model-padding) * 2);
  top: var(--model-padding);
  cursor: pointer;
  z-index: 1;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}
</style>