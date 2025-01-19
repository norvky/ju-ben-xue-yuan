<template>
  <div ref="controlContainer" class="maplibregl-ctrl" @click="onClick">
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M317.357 159.109c17.216-64.238 261.174 7.45 288.751 77.39 62.755 159.155 324.818 87.067 324.85 87.06L805.234 792.867s-262.088 72.108-324.85-87.059c-21.12-53.553-168.828-107.903-244.74-101.691l-69.727 260.26c-5.339 19.936-25.823 31.77-45.762 26.43-19.931-5.346-31.76-25.839-26.418-45.774L277.492 159.11c5.339-19.935 25.827-31.769 45.766-26.422 0.387 0.103 0.658 0.4 1.041 0.519"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</template>

<script setup name="TaskControl">
import { ref, defineEmits } from 'vue'

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
  if (map) {
    map.addControl({ onAdd, onRemove }, position)
    console.log('地图控件初始化完成: TaskControl')
  }
}

// 暴露 init 方法给父组件
defineExpose({ init })
</script>

<style scoped>
.maplibregl-ctrl {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 4px;
  color: #4d80f0;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
