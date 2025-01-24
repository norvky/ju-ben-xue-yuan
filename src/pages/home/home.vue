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
import wx from 'weixin-js-sdk'
import { taskLngLats } from './mock/taskLngLats'
import mapControls from './mapControls/mapControls.vue'
import { initMap, createMarker } from '@/utils/maplibregl/index'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

uni.hideTabBar()

let myMap = null
const mapReady = ref(false)
function getMyMap() {
  return myMap
}
function removeMyMap() {
  myMap && myMap.remove()
}

// 配置微信 JS SDK
const wxIsReady = ref(false)
wx.config({
  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: 'wx615c43e0d1964b40', // 必填，公众号的唯一标识
  nonceStr: '99f13f50-bf41-481f-9a4d-a833f76fe6ee', // 必填，生成签名的随机串
  timestamp: 1737693125, // 必填，生成签名的时间戳
  signature: '6a81223817f88d786f600520a86a609a6afcbc70', // 必填，签名
  jsApiList: ['getLocation', 'scanQRCode'], // 必填，需要使用的JS接口列表
})
wx.ready(() => {
  wxIsReady.value = true
  console.log('Weixin JS SDK Ready')
})
wx.error((res) => {
  console.error('Weixin JS SDK Error: %o', res)
})
// watch(
//   () => wxIsReady.value,
//   async (newValue) => {
//     newValue &&
//       wx.getLocation({
//         type: 'wgs84',
//         success: (res) => {
//           console.log('wx.getLocation: %o', res)
//           setTimeout(() => {
//             const marker = new maplibregl.Marker()
//               .setLngLat({ lng: res.longitude, lat: res.latitude })
//               .addTo(myMap)

//             myMap.setCenter({ lng: res.longitude, lat: res.latitude })
//           }, 1000)
//         },
//         fail: (res) => {
//           console.log('wx.getLocation fail: %o', res)
//         },
//       })
//   },
// )

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
