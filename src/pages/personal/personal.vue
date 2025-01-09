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

    <view>徽章数：8</view>
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
