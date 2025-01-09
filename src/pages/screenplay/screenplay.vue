<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '剧本',
  },
}
</route>

<template>
  <view
    class="overflow-hidden"
    :style="{
      marginTop: safeAreaInsets?.top + 'px',
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: `calc(100vh - ${safeAreaInsets?.top}px - 50px)`,
    }"
  >
    <view class="c-amber">
      <view>{{ platform }}</view>
      <view>{{ backgroundImageUrl }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import bg from '@/static/images/screenplay/index-bg.png'
import mbg from '@/static/images/screenplay/m-index-bg.png'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets, platform } = uni.getSystemInfoSync()

const backgroundImageUrl = ['ios', 'android'].includes(platform) ? mbg : bg
</script>

<style lang="scss" scoped>
//
</style>
