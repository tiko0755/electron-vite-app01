<script setup lang="ts">
import compx from './components/compx.vue'

const ipcRenderer = window.electron.ipcRenderer

const ipcHandle = () => ipcRenderer.send('ping')

const func = async () => {
  const response = await window.versions.pingping()
  console.log(response) // 打印 'pong'
}

func()

ipcRenderer.on('main to render', (evnt, msg) => {
  console.log(`receive message from main: ${msg}`)
})
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-button @click="ipcHandle">Send IPC</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">Please try pressing <code>F12</code> to open the devTool</el-col>
    <el-col :span="12"><compx msg="hello,world" /></el-col>
  </el-row>
</template>
