<template>
  <div ref="controlContainer" class="maplibregl-ctrl" @click="onClick">
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
        fill="currentColor"
      ></path>
    </svg>
  </div>

  <view
    :style="{
      position: 'absolute',
      left: '0',
      top: '0',
      right: '0',
      bottom: '0',
      opacity: showPage ? 1 : 0,
      transform: showPage ? 'scale(1)' : 'scale(0)',
      transformOrigin: 'calc(100% - 34px) 34px',
      transition: 'all 0.3s',
      zIndex: showPage ? 99 : -1,
    }"
  >
    <wd-button
      class="!absolute right-2 top-2 z-1 !bg-#7F776D !text-#3C1E1C"
      type="icon"
      icon="close"
      @click="showPage = false"
    />

    <PersonalPage />
  </view>
</template>

<script setup name="PersonalControl">
import { ref } from 'vue'
import PersonalPage from '@/pages/personal/personal.vue'

const controlContainer = ref(null)
const showPage = ref(false)

function onClick() {
  showPage.value = !showPage.value
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
const init = (myMap, position = 'top-right') => {
  if (myMap) {
    myMap.addControl({ onAdd, onRemove }, position)
    console.log('地图控件初始化完成: PersonalControl')
  } else {
    console.warn('地图对象不存在')
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
  transition: all 0.1s linear;
}
.maplibregl-ctrl:active {
  transform: scale(0.9);
}
</style>
