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
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="center">
      <wd-img :width="100" :height="100" round :src="avatarImg" />
    </view>

    <view>名称：XXX</view>
    <view>手机号：1XXXXXXXXXX</view>

    <view style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #000">
      <view class="text-center text-xl">徽章展示</view>

      <view class="mt-2 grid grid-cols-6 gap-2">
        <view v-for="i in 15" :key="i" class="flex justify-center">
          <wd-img :width="50" :height="50" round :src="avatarImg" />
        </view>
      </view>
    </view>

    <view style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #000">
      <view class="text-center text-xl">奖励展示</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import avatarImg from '@/static/logo.jpg'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

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
