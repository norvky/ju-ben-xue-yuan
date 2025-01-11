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
      position: 'relative',
      marginTop: safeAreaInsets?.top + 'px',
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: `calc(100vh - ${safeAreaInsets?.top}px - 50px)`,
    }"
  >
    <view v-if="props.taskData" class="c-amber">
      <view>{{ JSON.stringify(props.taskData) }}</view>
    </view>

    <Widget :imageSrc="jubenji" :position="{ x: 100, y: 100 }" />
    <Widget :imageSrc="jubenfaxing" :position="{ x: 600, y: 200 }" />
    <Widget :imageSrc="tananguan" :position="{ x: 1000, y: 200 }" />
  </view>
</template>

<script lang="ts" setup>
import bg from '@/static/images/screenplay/index-bg.png'
import mbg from '@/static/images/screenplay/m-index-bg.png'
import Widget from './widget.vue'
import jubenji from '@/static/images/screenplay/jubenji.png'
import jubenfaxing from '@/static/images/screenplay/jubenfaxing.png'
import tananguan from '@/static/images/screenplay/tananguan.png'

const props = defineProps({
  taskData: {
    type: Object,
    default: () => {},
  },
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets, platform } = uni.getSystemInfoSync()

const backgroundImageUrl = ['ios', 'android'].includes(platform) ? mbg : bg
</script>

<style lang="scss" scoped>
//
</style>
