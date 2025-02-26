<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <slot></slot>
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
</style>
