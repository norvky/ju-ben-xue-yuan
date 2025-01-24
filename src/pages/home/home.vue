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

    <wd-popup
      v-model="showLoginPage"
      custom-style="border-radius:32rpx;"
      @close="showLoginPage = false"
    >
      <view class="w-80vw bg-#fff overflow-hidden">
        <LoginPage v-if="showLoginPage" />
      </view>
    </wd-popup>
  </view>
</template>

<script setup name="Home">
import wx from 'weixin-js-sdk'
import { taskLngLats } from './mock/taskLngLats'
import mapControls from './mapControls/mapControls.vue'
import LoginPage from '@/pages/login/login.vue'
import { initMap, createMarker } from '@/utils/maplibregl/index'
import { useUserStore } from '@/store'
import { getTkCfg } from '@/service/login'

uni.hideTabBar()

const { VITE_WX_APPID } = import.meta.env
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()

const showLoginPage = ref(false)

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
wx.ready(() => {
  wxIsReady.value = true
  console.log('Weixin JS SDK Ready')
})
wx.error((res) => {
  console.error('Weixin JS SDK Error: %o', res)
})
async function initWXJSSDK() {
  const url = window.location.href.replace(window.location.hash, '')
  const { code, data } = await getTkCfg({ url })
  if (code !== 200) {
    return
  }

  wx.config({
    debug: false,
    appId: VITE_WX_APPID,
    nonceStr: data.nonceStr,
    timestamp: data.timestamp,
    signature: data.signature,
    jsApiList: ['getLocation', 'scanQRCode'],
  })
}

initWXJSSDK()

onShow(() => {
  const search = window.location.search
  if (search) {
    const params = new URLSearchParams(search)
    const code = params.get('code')
    userStore.setWXCode(code)

    const fullUrl = window.location.href
    const newUrl = fullUrl.replace(search, '')
    window.history.replaceState({}, document.title, newUrl)

    showLoginPage.value = true
  }
})

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

provide('homeData', { getMyMap, mapReady, showLoginPage, userStore })
</script>

<style lang="scss" scoped>
.main-title-color {
  color: #d14328;
}
</style>
