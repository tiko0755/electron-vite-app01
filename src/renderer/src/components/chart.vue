<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chart = echarts.init(document.getElementById('kchart'))

// const props = defineProps({
//   // eslint-disable-next-line vue/require-prop-types, vue/prop-name-casing
//   msg: {
//     String,
//     default: 'chart'
//   }
// })

const splitData = (rawData: Array) => {
  const categoryData = []
  const values = []
  const volumes = []
  const exchs = []
  const z5 = []
  const z10 = []
  const z20 = []
  const z30 = []
  const z40 = []
  const z60 = []
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i][0])
    const rec = []
    rec.push(rawData[i][1])
    rec.push(rawData[i][2])
    rec.push(rawData[i][3])
    rec.push(rawData[i][4])
    values.push(rec)
    volumes.push([i, rawData[i][5], rawData[i][1] > rawData[i][2] ? 1 : -1])
    exchs.push(rawData[i][6])
    z5.push(rawData[i][7])
    z10.push(rawData[i][8])
    z20.push(rawData[i][9])
    z30.push(rawData[i][10])
    z40.push(rawData[i][11])
    z60.push(rawData[i][12])
  }
  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes,
    exchs: exchs,
    z5: z5,
    z10: z10,
    z20: z20,
    z30: z30,
    z40: z40,
    z60: z60
  }
}

const updateChart = (dat) => {
  const chartData = dat
  console.log('chart.updateChart.dat:', chartData)
  const data = splitData(chartData)
  // console.log('splitData:', data)
  const dwnColor = '#00da3c'
  const upColor = '#ec0000'
  const option = {
    animation: false,
    legend: {
      top: 10,
      left: 'center',
      data: ['KLine', 'ZR5', 'ZR10', 'ZR20', 'ZR30', 'ZR40', 'ZR60'],
      selected: { ZR10: false, ZR20: false }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 5,
      textStyle: {
        color: '#000'
      },
      position: function (pos, params, el, elRect, size) {
        const obj = { top: 10 }
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
        return obj
      }
      // extraCssText: 'width: 170px'
    },
    axisPointer: {
      link: { xAxisIndex: 'all' },
      label: {
        backgroundColor: '#777'
      }
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: dwnColor
        },
        {
          value: -1,
          color: upColor
        }
      ]
    },
    grid: [
      {
        left: '10%',
        right: '8%',
        height: '50%'
      },
      {
        left: '10%',
        right: '8%',
        top: '63%',
        height: '16%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100
        }
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 70,
        end: 100
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '85%',
        start: 70,
        end: 100
      }
    ],
    series: [
      {
        name: 'KLine',
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          color: upColor,
          color0: dwnColor,
          borderColor: null,
          borderColor0: null
        },
        tooltip: {
          formatter: function (param) {
            param = param[0]
            return [
              'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
              'Open: ' + param.data[0] + '<br/>',
              'Close: ' + param.data[1] + '<br/>',
              'Lowest: ' + param.data[2] + '<br/>',
              'Highest: ' + param.data[3] + '<br/>'
            ].join('')
          }
        }
      },
      {
        name: 'ZR5',
        color: '#00da3c',
        type: 'line',
        data: data.z5,
        smooth: false,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'ZR10',
        color: '#20da3c',
        type: 'line',
        data: data.z10,
        smooth: false,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'ZR20',
        color: '#42da3c',
        type: 'line',
        data: data.z20,
        smooth: false,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'ZR30',
        color: '#60da3c',
        type: 'line',
        data: data.z30,
        smooth: false,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'ZR40',
        color: '#80da3c',
        type: 'line',
        data: data.z40,
        smooth: false,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'ZR60',
        color: '#A0da3c',
        type: 'line',
        data: data.z60,
        smooth: false,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes
      }
    ]
  }
  chart.setOption(option, true)
  chart.dispatchAction({
    type: 'brush',
    areas: [
      {
        brushType: 'lineX',
        coordRange: [20201101, 20210110],
        xAxisIndex: 0
      }
    ]
  })
}

onMounted(() => {
  console.log('chart onMounted')
  // ipcRenderer.on('main_to_render', evntMainToRender);
})
onUnmounted(() => {
  console.log('chart onUnmounted')
})
</script>

<template>
  <div id="kchart" style="height: 450px"></div>
</template>
