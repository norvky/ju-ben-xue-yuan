<template>
  <div
    class="widget"
    :style="{
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      cursor: 'pointer',
    }"
    @mouseenter="startShake"
    @mouseleave="stopShake"
    @click="handleClick"
  >
    <img
      :src="imageSrc"
      alt="Widget"
      :style="{
        width: imageSize.width,
        height: imageSize.height,
        transition: 'transform 0.1s',
        transform: isShaking ? 'rotate(5deg)' : 'rotate(0deg)',
        opacity: isShaking ? 1 : 0.8,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 接收图片、尺寸和位置 props
const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
  imageSize: {
    type: Object,
    required: true,
  },
})

// 抖动状态
const isShaking = ref(false)

// 开始抖动
const startShake = () => {
  isShaking.value = true
}

// 停止抖动
const stopShake = () => {
  isShaking.value = false
}

// 点击事件
const handleClick = () => {
  console.log('Widget clicked!')
}
</script>

<style scoped>
.widget {
  transition: transform 0.1s;
}
</style>
