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
  </view>
</template>

<script lang="ts" setup>
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

function initMap() {
  const map = new maplibregl.Map({
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

  map.on('click', (e) => {
    console.log('A click event has occurred at ' + e.lngLat)
  })
}

onLoad(() => {})

onMounted(() => {
  initMap()
})
</script>

<style lang="scss" scoped>
.main-title-color {
  color: #d14328;
}
</style>
