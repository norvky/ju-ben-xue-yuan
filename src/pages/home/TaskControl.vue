<template>
  <div ref="controlContainer" class="maplibregl-ctrl" @click="onClick">
    <img :src="controlIcon" alt="任务" width="40" />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import controlIcon from '@/static/images/mapControls/taskControl.svg'

const emit = defineEmits(['onClick'])

// 控件的 DOM 元素
const controlContainer = ref(null)

function onClick() {
  // console.log('click: %o', controlContainer.value)
  emit('onClick')
}

// 控件的 onAdd 方法
const onAdd = () => {
  return controlContainer.value
}

// 控件的 onRemove 方法
const onRemove = () => {
  if (controlContainer.value?.parentNode) {
    controlContainer.value.parentNode.removeChild(controlContainer.value)
  }
}

// 暴露 init 方法
const init = (map, position = 'top-right') => {
  console.log('map: %o', map)
  if (map) {
    map.addControl({ onAdd, onRemove }, position)
    console.log('初始化完成')
  }
}

// 暴露 init 方法给父组件
defineExpose({ init })
</script>

<style scoped>
.maplibregl-ctrl {
  padding: 4px;
  cursor: pointer;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
