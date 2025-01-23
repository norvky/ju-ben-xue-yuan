<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '个人中心',
  },
}
</route>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4 min-h-screen"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="">
      <view class="center">
        <wd-img :width="100" :height="100" round :src="avatarImg" />
      </view>

      <view>名称：{{ userStore?.userInfo?.nickname || '-' }}</view>
      <view>手机号：{{ userStore?.userInfo?.phone || '-' }}</view>

      <view class="b-rounded" style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #ccc">
        <view class="text-center text-xl">徽章展示</view>

        <view class="mt-2 grid grid-cols-6 gap-2">
          <view v-for="i in 15" :key="i" class="flex justify-center">
            <wd-img :width="50" :height="50" round :src="logo" />
          </view>
        </view>
      </view>

      <view class="b-rounded" style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #ccc">
        <view class="text-center text-xl">奖励展示</view>

        <view class="mt-2 grid grid-cols-1 gap-2">
          <view v-for="i in 5" :key="i" class="flex bg-#eee">
            <wd-img :width="50" :height="50" round :src="logo" />
          </view>
        </view>
      </view>
    </view>

    <view class="mt-4 p-2 flex justify-center">
      <wd-button type="error" @click="loginOut">退出登录</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import logo from '@/static/logo.jpg'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()

const avatarImg = computed(() => {
  return userStore?.userInfo?.avatar || logo
})

function loginOut() {
  userStore.reset()

  // 提示
  uni.showToast({
    title: '退出登录成功',
    icon: 'success',
  })
}

const timestamp = Date.now()
jWeixin.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: 'wx615c43e0d1964b40', // 必填，公众号的唯一标识
  timestamp, // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '', // 必填，签名
  jsApiList: ['scanQRCode'], // 必填，需要使用的JS接口列表
})

jWeixin.ready(() => {
  console.log('jWeixin.ready: %o')
})

jWeixin.error((res) => {
  console.log('jWeixin.error: %o', res)
})
</script>

<style lang="scss" scoped>
//
</style>
