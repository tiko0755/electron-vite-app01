<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'

// interface newTradeItem {
//   code: string
//   date: string
//   price: number
//   vol: number
//   remark: string
// }

// do not use same name with ref
const form = reactive({
  name: '600233 大参林',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const select = ref('')
const onSubmit = () => {
  console.log('submit!')
}

const code = ref("12345")
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
// const props = defineProps({
//   // eslint-disable-next-line vue/require-prop-types, vue/prop-name-casing
//   msg: {
//     String,
//     default: 'trade'
//   }
// })

// const msg = 'trade'

onMounted(() => {
  console.log('trade onMounted')
  // ipcRenderer.on('main_to_render', evntMainToRender);
})
onUnmounted(() => {
  console.log('trade onUnmounted')
})
// const onCreateTrade = () => {
//   console.log('onCreateTrade')
// }
// const onCreateDeal = () => {
//   console.log('onCreateDeal')
// }
</script>

<template>
  <div class="Container">
    <el-tabs type="border-card">
      <el-tab-pane label="当前交易">
        <el-row :gutter="10" justify="center">
          <el-col :span="3">
            <el-input v-model="form.name" disabled placeholder="Please input" />
          </el-col>
          <el-col :span="6">
            <el-input v-model="input3" placeholder="数量" class="input-with-select">
              <template #prepend>
                <el-switch
                  v-model="form.delivery"
                  class="ml-2"
                  inline-prompt
                  style="--el-switch-on-color: #11e622e3; --el-switch-off-color: #ff4949"
                  active-text="买"
                  inactive-text="卖"
                />
              </template>
              <template #append> 股 </template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="input3" placeholder="投资周期\止损止盈" class="input-with-select">
              <template #prepend>
                <span>备忘</span>
              </template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-date-picker v-model="value1" type="datetime" placeholder="Select date and time" />
          </el-col>
          <el-col :span="2">
            <el-button plain>交易</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="历史交易">Config</el-tab-pane>
      <el-tab-pane label="交易策略">Role</el-tab-pane>
    </el-tabs>
  </div>
</template>
