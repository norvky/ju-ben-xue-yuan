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

    <TaskControl ref="taskControl" @onClick="showScreenplay = true" />

    <view
      :style="{
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        opacity: showScreenplay ? 1 : 0,
        transform: showScreenplay ? 'scale(1)' : 'scale(0)',
        transformOrigin: 'calc(100% - 34px) 34px',
        transition: 'all 0.3s',
        zIndex: showScreenplay ? 99 : -1,
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
import { getNewRoute } from '@/service/amap/index'
import gcoord from 'gcoord'

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

  map.on('load', () => {
    map.addSource('route-source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [], // 初始为空
      },
    })

    // 添加路线图层
    map.addLayer({
      id: 'route-layer',
      type: 'line',
      source: 'route-source',
      paint: {
        'line-color': '#ff0000', // 线的颜色
        'line-width': 3, // 线的宽度
      },
    })
  })

  // 更新路线的函数
  const updateRoute = (route) => {
    // 将高德地图的 GCJ-02 坐标转换为 WGS84 坐标
    const routeGeoJSON = {
      type: 'FeatureCollection',
      features: route.paths[0].steps.map((step) => {
        const coordinates = step.polyline.split(';').map((point) => {
          const [lng, lat] = point.split(',').map(parseFloat)
          return gcoord.transform([lng, lat], gcoord.GCJ02, gcoord.WGS84)
        })
        return {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates,
          },
          properties: {
            instruction: step.instruction,
            distance: step.step_distance,
          },
        }
      }),
    }

    // 更新已有的数据源
    const routeSource = map.getSource('route-source')
    if (routeSource) {
      routeSource.setData(routeGeoJSON)
    }
  }

  function openAmap(lat, lng) {
    const url = `androidamap://viewMap?sourceApplication=myApp&lat=${lat}&lon=${lng}&dev=0`

    // 创建隐藏的 <a> 标签
    const link = document.createElement('a')
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)

    // 触发点击
    link.click()

    // 移除 <a> 标签
    setTimeout(function () {
      document.body.removeChild(link)
    }, 100)
  }

  taskLngLats.forEach((item) => {
    const marker = new maplibregl.Marker({ color: 'red' })
      .setLngLat(item)
      // .setPopup(new maplibregl.Popup({ offset: 25 }).setText(item.desc))
      .addTo(map)

    const markerElement = marker.getElement()
    markerElement.style.cursor = 'pointer'

    markerElement.addEventListener('click', () => {
      taskData.value = item
      // showScreenplay.value = !showScreenplay.value

      const origin = [108.38025476582408, 22.762367277980474] // 起点
      const destination = [item.lng, item.lat] // 终点

      const originGCJ02 = gcoord.transform(origin, gcoord.WGS84, gcoord.GCJ02)
      const destinationGCJ02 = gcoord.transform(destination, gcoord.WGS84, gcoord.GCJ02)

      // openAmap(destinationGCJ02[1], destinationGCJ02[0])

      getNewRoute({
        origin: originGCJ02.join(','),
        destination: destinationGCJ02.join(','),
      }).then((res) => {
        const { route } = res
        console.log('res - data', route)

        // 绘制路线
        updateRoute(route)
      })
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
