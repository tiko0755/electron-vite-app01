<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // eslint-disable-next-line vue/require-prop-types, vue/prop-name-casing
  msg: {
    String,
    default: 'hi'
  }
})

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
