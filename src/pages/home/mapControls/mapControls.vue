<template>
  <view class="map-controls">
    <PersonalControl ref="personalControl" />

    <TaskControl ref="taskControl" />

    <ExchangeBadgesControl />

    <ScanControl />

    <LookAroundControl />
  </view>
</template>

<script setup name="mapControls">
import PersonalControl from './PersonalControl/index.vue'
import TaskControl from './TaskControl/index.vue'
import ExchangeBadgesControl from './ExchangeBadgesControl/index.vue'
import ScanControl from './ScanControl/index.vue'
import LookAroundControl from './LookAroundControl/index.vue'

const { getMyMap, mapReady } = inject('homeData')

let myMap = null
const personalControl = ref(null)
const taskControl = ref(null)

watch(
  () => mapReady.value,
  async (newValue) => {
    if (newValue) {
      myMap = getMyMap()
      myMap && initControls()
    }
  },
)

function initControls() {
  personalControl.value.init(myMap, 'top-right')
  taskControl.value.init(myMap, 'top-right')
}
</script>

<style lang="scss" scoped>
//
</style>
