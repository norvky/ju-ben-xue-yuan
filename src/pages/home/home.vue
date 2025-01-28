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
    class="relative bg-white overflow-hidden dark-mode"
    :style="{
      marginTop: safeAreaInsets?.top + 'px',
      height: `calc(100vh - ${safeAreaInsets?.top}px - ${safeAreaInsets?.bottom}px)`,
    }"
  >
    <wd-notify />

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
import { useNotify } from 'wot-design-uni'
import wx from 'weixin-js-sdk'
import { taskLngLats } from './mock/taskLngLats'
import mapControls from './mapControls/mapControls.vue'
import LoginPage from '@/pages/login/login.vue'
import {
  initMap,
  updateMyLocation,
  updateRedEnvelopes,
  fitRedEnvelopes,
} from '@/utils/maplibregl/index'
import { useUserStore } from '@/store'
import { getTkCfg, getInfo } from '@/service/login'
import { createTimer } from '@/utils/timer'
import parseParameters from './parseParameters'

uni.hideTabBar()

const { showNotify } = useNotify()
const { VITE_WX_APPID } = import.meta.env
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()

const myTimer = createTimer()
const showLoginPage = ref(false)
watch(
  () => showLoginPage.value,
  async (newValue) => {
    newValue &&
      showNotify({
        message: '请先登录',
        type: 'warning',
      })
  },
)

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

  // TODO: 持续获取地理位置
  wx.getLocation({
    type: 'wgs84',
    success: (res) => {
      updateMyLocation(res)
    },
  })
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

  const devEnv = import.meta.env.DEV

  wx.config({
    debug: false,
    appId: VITE_WX_APPID,
    nonceStr: devEnv ? 'Wm3WZYTPz0wzacny' : data.nonceStr,
    timestamp: devEnv ? '1738047833' : data.timestamp,
    signature: devEnv ? 'cb8ff4b3defeecabaa38a8f3b6f581bfaccac49f' : data.signature,
    jsApiList: ['getLocation', 'scanQRCode'],
  })
}

initWXJSSDK()

onShow(() => {
  const { search } = window.location
  console.log('onShow - search: %o', search)
  search && parseParameters(search, showLoginPage)
})

onMounted(() => {
  myMap = initMap({
    container: 'mapContainer',
  })
  mapReady.value = true

  updateRedEnvelopes().then(() => {
    fitRedEnvelopes()
  })

  myTimer.start(() => {
    updateRedEnvelopes()
  })

  if (userStore.isLogined) {
    getInfo().then((res) => {
      const { code, data, msg } = res
      if (code === 401) {
        userStore.clearUserInfo()
        showNotify({
          message: '登录已过期，请重新登录',
          type: 'warning',
        })
        // showLoginPage.value = true
        return
      } else if (code !== 200) {
        showNotify({
          message: msg,
          type: 'danger',
        })
        return
      }

      userStore.setUserInfo(data)
    })
  }

  // taskLngLats.forEach((item) => {
  //   createMarker(item)
  // })
})
onBeforeUnmount(() => {
  myTimer.stop()
  removeMyMap()
})

provide('homeData', { getMyMap, mapReady, showLoginPage, userStore })
</script>

<style lang="scss" scoped>
.main-title-color {
  color: #d14328;
}
</style>
