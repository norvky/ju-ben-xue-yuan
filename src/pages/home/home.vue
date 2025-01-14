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
    class="bg-white overflow-hidden"
    :style="{
      marginTop: safeAreaInsets?.top + 'px',
      height: `calc(100vh - ${safeAreaInsets?.top}px - 50px)`,
    }"
  >
    <view id="map" class="w-full h-full"></view>

    <TaskControl ref="taskControl" />

    <view
      :style="{
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        opacity: showScreenplay ? 1 : 0,
        transform: showScreenplay ? 'scale(1)' : 'scale(0.5)',
        transition: 'all 0.3s',
        zIndex: showScreenplay ? 1 : -1,
      }"
    >
      <wd-button
        class="!absolute right-2 top-2 z-1 !bg-#7F776D !text-#3C1E1C"
        type="icon"
        icon="close"
        @click="showScreenplay = !showScreenplay"
      />

      <Screenplay :task-data="taskData" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { taskLngLats } from './mock/taskLngLats'
import Screenplay from '../screenplay/screenplay.vue'
import TaskControl from './TaskControl.vue'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

let map = null
let myLocationMarker = null
const showScreenplay = ref(false)
const taskData = ref(null)
const taskControl = ref(null)

function initMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {
        'gaode-map': {
          type: 'raster',
          tiles: [
            'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
          ],
          tileSize: 256,
          attribution: '© <a href="https://www.amap.com/">高德地图</a>',
        },
      },
      layers: [
        {
          id: 'gaode-map-layer',
          type: 'raster',
          source: 'gaode-map',
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    },
    center: [108.38025476582408, 22.762367277980474],
    zoom: 17,
  })

  taskControl.value.init(map, 'top-right')

  map.on('click', (res) => {
    console.log('Map clicked:', res.lngLat)
  })

  taskLngLats.forEach((item) => {
    const marker = new maplibregl.Marker({ color: 'red' })
      .setLngLat(item)
      // .setPopup(new maplibregl.Popup({ offset: 25 }).setText(item.desc))
      .addTo(map)

    const markerElement = marker.getElement()
    markerElement.style.cursor = 'pointer'

    markerElement.addEventListener('click', () => {
      taskData.value = item
      showScreenplay.value = !showScreenplay.value
    })
  })

  myLocationMarker = new maplibregl.Marker()
  uni.getLocation({
    type: 'wgs84',
    success: function (res) {
      // const lngLat = [res.longitude, res.latitude]
      const lngLat = [108.38025476582408, 22.762367277980474]
      myLocationMarker.setLngLat(lngLat).addTo(map)
      map.setCenter(lngLat)
    },
  })
}

onLoad(() => {})

onMounted(() => {
  initMap()
})
onBeforeUnmount(() => {
  map.remove()
})
</script>

<style lang="scss" scoped>
.main-title-color {
  color: #d14328;
}
</style>
