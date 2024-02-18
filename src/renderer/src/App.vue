<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import compx from './components/compx.vue'
import chart from './components/chart.vue'
import trade from './components/trade.vue'
import { Check, Expand } from '@element-plus/icons-vue'

interface AutocompleteItem {
  value: string
  code: string
  abbr: string
}

interface allCodeType {
  code: Array<string>
  name: Array<string>
  abbr: Array<string>
  birth: Array<string>
  block: Array<string>
  major: Array<string>
}

const currentComponent = shallowRef(compx)
const ipcRenderer = window.electron.ipcRenderer
let allCodeLst: allCodeType

const ipcHandle = () => {
  ipcRenderer.send('ping')
}

const api = {
  hello: () => {
    console.log('preload.api.hello')
  },
  goodbye: () => {
    console.log('preload.api.goodbyd')
  },
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  pingping: () => ipcRenderer.invoke('ping-ping'),
  req: (channel, cb) => {
    ipcRenderer.invoke(channel).then((result) => {
      cb(result)
    })
  }
  // 除函数之外，我们也可以暴露变量
}

const drawer = ref(false)
const radio = ref('行情')
const state = ref('')
let autoItems: Array<AutocompleteItem> = []

const querySearch = (queryString: string, cb) => {
  const results = autoItems.filter(createFilter(queryString))
  cb(results)
}
const createFilter = (queryString: string) => {
  return (rec) => {
    return (
      rec.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 ||
      rec.abbr.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = (_allcode: allCodeType) => {
  const ary: Array<AutocompleteItem> = []
  for (let i = 0; i < _allcode.name.length; i++) {
    const rec: AutocompleteItem = {
      value: `${_allcode.code[i].slice(2, 8)} ${_allcode.name[i]}`,
      code: _allcode.code[i],
      abbr: _allcode.abbr[i]
    }
    ary.push(rec)
  }
  // console.log('loadAll.ary:', ary)
  return ary
}
const handleSelect = (item: AutocompleteItem) => {
  state.value = `${item.value}`
  // 把最新选出来的排在前面
  autoItems.unshift({
    value: item.value,
    code: item.code,
    abbr: item.abbr
  })
  for (let i = 1; i < autoItems.length; i++) {
    if (autoItems[i].value.indexOf(item.value) === 0) {
      autoItems.splice(i, 1)
      break
    }
  }
}
const onMenuChanged = (label) => {
  console.log('label:', label)
  if (label === '交易') {
    currentComponent.value = trade
  } else if (label === '图表') {
    currentComponent.value = chart
  } else {
    currentComponent.value = compx
  }
}

onMounted(() => {
  api.req('all_codes', (codes) => {
    allCodeLst = JSON.parse(codes)
    autoItems = loadAll(allCodeLst)
    // console.log('onMounted.autoItems:', autoItems)
  })
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header height="20px">
        <el-row justify="space-between">
          <el-col :span="2">
            <el-button :icon="Expand" style="margin-left: 16px" @click="drawer = true"></el-button>
          </el-col>
          <el-col :span="18">
            <el-radio-group v-model="radio" @change="onMenuChanged">
              <el-radio-button label="行情" />
              <el-radio-button label="策略" />
              <el-radio-button label="图表" />
              <el-radio-button label="选股" />
              <el-radio-button label="交易" />
            </el-radio-group>
          </el-col>
          <el-col :span="4">
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearch"
              clearable
              class="inline-input w-50"
              placeholder="代码/拼音"
              @select="handleSelect"
            />
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <component :is="currentComponent"></component>
      </el-main>
    </el-container>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-divider content-position="left">Rabindranath Tagore</el-divider>
      <el-row>
        <el-button :icon="Check" @click="ipcHandle">Send IPC</el-button>
      </el-row>
      <el-divider content-position="left">Rabindranath Tagore</el-divider>
      <el-row>
        <el-button :icon="Check" @click="ipcHandle">Send IPC</el-button>
      </el-row>
    </el-drawer>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
