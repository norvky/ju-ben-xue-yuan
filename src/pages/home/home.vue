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

<script setup>
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { taskLngLats } from './mock/taskLngLats'
import mapControls from './mapControls/mapControls.vue'
import { getNewRoute } from '@/service/amap/index'
import gcoord from 'gcoord'

defineOptions({
  name: 'Home',
})

uni.hideTabBar()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

let myMap = null
const mapReady = ref(false)
let myLocationMarker = null

function initMap() {
  myMap = new maplibregl.Map({
    container: 'mapContainer',
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
    attributionControl: false, // 禁用版权控件
  })

  myMap.on('click', (res) => {
    console.log('myMap clicked:', res.lngLat)
  })

  myMap.on('load', () => {
    mapReady.value = true
    myMap.addSource('route-source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [], // 初始为空
      },
    })

    // 添加路线图层
    myMap.addLayer({
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
    const routeSource = myMap.getSource('route-source')
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

  taskLngLats.forEach(async (item) => {
    let marker = null

    if ('icon' in item) {
      marker = await createCustomMarker(item, myMap)
    } else {
      marker = new maplibregl.Marker({ color: 'red' })
        .setLngLat(item)
        // .setPopup(new maplibregl.Popup({ offset: 25 }).setText(item.desc))
        .addTo(myMap)
    }

    const markerElement = marker.getElement()
    markerElement.style.cursor = 'pointer'

    markerElement.addEventListener('click', () => {
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
      myLocationMarker.setLngLat(lngLat).addTo(myMap)
      myMap.setCenter(lngLat)
    },
  })
}

async function createCustomMarker(item, myMap) {
  const el = document.createElement('div')

  const response = await fetch(item.icon)
  const svgContent = await response.text()

  // 插入到 div 中
  el.innerHTML = svgContent

  // 获取 SVG 元素
  const svgElement = el.querySelector('svg')
  if (svgElement) {
    svgElement.style.width = `${item.iconSize[0]}px`
    svgElement.style.height = `${item.iconSize[1]}px`
  }

  return new maplibregl.Marker({ element: el }).setLngLat([item.lng, item.lat]).addTo(myMap)
}

function getMyMap() {
  return myMap
}
function removeMyMap() {
  myMap && myMap.remove()
}

onMounted(() => {
  initMap()
})
onBeforeUnmount(() => {
  removeMyMap()
})

provide('home', { getMyMap, mapReady })
</script>

<style lang="scss" scoped>
.main-title-color {
  color: #d14328;
}
</style>
