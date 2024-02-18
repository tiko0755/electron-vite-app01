<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// const props = defineProps({
//   msg: {
//     String,
//     default: 'compx'
//   }
// })

const msg = 'compx'

onMounted(() => {
  console.log('compX onMounted')
  // ipcRenderer.on('main_to_render', evntMainToRender);
})
onUnmounted(() => {
  console.log('compX onUnmounted')
})
</script>

<template>
  <span>msg:{{ msg }}</span>
</template>
