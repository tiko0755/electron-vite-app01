<script setup lang="ts">
import compx from './components/compx.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-button @click="ipcHandle">Send IPC</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">Please try pressing <code>F12</code> to open the devTool</el-col>
    <el-col :span="12"><compx msg="hello" /></el-col>
  </el-row>
</template>
