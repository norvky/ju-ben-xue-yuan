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
      overflow: 'auto',
    }"
  >
    <view v-if="props.taskData" class="c-amber">
      <view>{{ JSON.stringify(props.taskData) }}</view>
    </view>

    <!-- 动态渲染挂件 -->
    <Widget
      v-for="(widget, index) in widgets"
      :key="index"
      :imageSrc="widget.imageSrc"
      :imageSize="widget.calculatedSize"
      :position="widget.position"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
const { safeAreaInsets, platform, windowWidth, windowHeight } = uni.getSystemInfoSync()

// 背景图
const backgroundImageUrl = ['ios', 'android'].includes(platform) ? mbg : bg

// 挂件数据
const widgets = ref([
  {
    imageSrc: jubenji,
    imageSize: { web: { width: '30%', height: 'auto' }, mobile: { width: '65vw', height: 'auto' } },
    position: { x: 0, y: 0 },
    calculatedSize: { width: '0px', height: '0px' },
  },
  {
    imageSrc: jubenfaxing,
    imageSize: { web: { width: '20%', height: 'auto' }, mobile: { width: '25vw', height: 'auto' } },
    position: { x: 0, y: 0 },
    calculatedSize: { width: '0px', height: '0px' },
  },
  {
    imageSrc: tananguan,
    imageSize: { web: { width: '35%', height: 'auto' }, mobile: { width: '55vw', height: 'auto' } },
    position: { x: 0, y: 0 },
    calculatedSize: { width: '0px', height: '0px' },
  },
])

// 计算百分比宽高
const calculatePercentageSize = (value: string, screenSize: number) => {
  const percentage = parseFloat(value) / 100
  if (isNaN(percentage) || percentage <= 0) {
    console.warn('Invalid percentage value:', value)
    return 0
  }
  return percentage * screenSize
}

// 计算挂件位置和尺寸
const calculateWidgetPositions = () => {
  const screenWidth = windowWidth
  const screenHeight = windowHeight
  const isMobile = screenWidth <= 768 // 假设屏幕宽度小于等于 768px 是移动端
  const margin = 20 // 挂件间距

  let x = margin
  let y = margin
  let maxHeightInRow = 0 // 当前行最大高度

  widgets.value = widgets.value.map((widget) => {
    const { web, mobile } = widget.imageSize
    const widgetWidth = isMobile
      ? calculatePercentageSize(mobile.width, screenWidth)
      : calculatePercentageSize(web.width, screenWidth)

    // 动态计算高度（保持图片宽高比）
    const img = new Image()
    img.src = widget.imageSrc
    const aspectRatio = img.width / img.height // 图片宽高比
    const widgetHeight = widgetWidth / aspectRatio

    const position = { x, y }

    if (isMobile) {
      // 移动端：小挂件一行两个，错落排列
      if (widgetWidth <= calculatePercentageSize('20vw', screenWidth)) {
        // 小挂件
        if (x + widgetWidth + margin > screenWidth) {
          x = margin
          y += maxHeightInRow + margin
          maxHeightInRow = 0
        }
        position.x = x
        position.y = y
        x += widgetWidth + margin
        maxHeightInRow = Math.max(maxHeightInRow, widgetHeight)
      } else {
        // 大挂件
        x = margin
        y += maxHeightInRow + margin
        position.x = x
        position.y = y
        x += widgetWidth + margin
        maxHeightInRow = widgetHeight
      }
    } else {
      // Web 端：每行多个挂件，自动换行
      if (x + widgetWidth > screenWidth) {
        x = margin
        y += maxHeightInRow + margin
        maxHeightInRow = 0
      }
      position.x = x
      position.y = y
      x += widgetWidth + margin
      maxHeightInRow = Math.max(maxHeightInRow, widgetHeight)
    }

    // 计算后的尺寸
    widget.calculatedSize = {
      width: isMobile ? mobile.width : `${widgetWidth}px`,
      height: `${widgetHeight}px`, // 根据宽高比动态计算高度
    }

    return { ...widget, position }
  })
}

// 初始化挂件位置
onMounted(() => {
  calculateWidgetPositions()
})

// 监听屏幕宽度变化
onMounted(() => {
  window.addEventListener('resize', calculateWidgetPositions)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateWidgetPositions)
})
</script>

<style lang="scss" scoped>
//
</style>
