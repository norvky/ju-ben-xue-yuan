<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '剧本学院',
  },
}
</route>

<template>
  <view
    class="relative bg-white overflow-hidden"
    :style="{
      marginTop: safeAreaInsets?.top + 'px',
      height: `calc(100vh - ${safeAreaInsets?.top}px - ${safeAreaInsets?.bottom}px)`,
    }"
  >
    <view id="mapContainer" class="w-full h-full"></view>

    <mapControls />
  </view>
</template>

<script setup name="Home">
import 'maplibre-gl/dist/maplibre-gl.css'
import { taskLngLats } from './mock/taskLngLats'
import mapControls from './mapControls/mapControls.vue'
import { initMap, createMarker } from '@/utils/maplibregl/index'

uni.hideTabBar()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

let myMap = null
const mapReady = ref(false)

function getMyMap() {
  return myMap
}
function removeMyMap() {
  myMap && myMap.remove()
}

onMounted(() => {
  myMap = initMap('mapContainer')
  mapReady.value = true

  taskLngLats.forEach((item) => {
    createMarker(item)
  })
})
onBeforeUnmount(() => {
  removeMyMap()
})

provide('homeData', { getMyMap, mapReady })
</script>

<style lang="scss" scoped>
.main-title-color {
  color: #d14328;
}
</style>
