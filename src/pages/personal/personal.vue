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

    <view style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #000">
      <view class="text-center text-xl">徽章展示</view>

      <view class="mt-2 grid grid-cols-6 gap-2">
        <view v-for="i in 15" :key="i" class="flex justify-center">
          <wd-img :width="50" :height="50" round :src="avatarImg" />
        </view>
      </view>
    </view>

    <view style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #000">
      <view class="text-center text-xl">随便展示1</view>
    </view>

    <view style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #000">
      <view class="text-center text-xl">随便展示2</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import avatarImg from '@/static/logo.jpg'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss" scoped>
//
</style>
