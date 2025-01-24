<template>
  <view
    class="maplibregl-ctrl"
    :style="{
      bottom: safeAreaInsets?.bottom + 20 + 'px',
    }"
    @click="onClick"
  >
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M512 832c-156.448 0-296.021333-98.730667-418.410667-291.605333a52.938667 52.938667 0 0 1 0-56.789334C215.978667 290.730667 355.552 192 512 192c156.448 0 296.021333 98.730667 418.410667 291.605333a52.938667 52.938667 0 0 1 0 56.789334C808.021333 733.269333 668.448 832 512 832z m0-576c-129.514667 0-249.461333 83.850667-360.117333 256C262.538667 684.149333 382.485333 768 512 768c129.514667 0 249.461333-83.850667 360.117333-256C761.461333 339.850667 641.514667 256 512 256z m0 405.333333c-83.210667 0-150.666667-66.858667-150.666667-149.333333S428.789333 362.666667 512 362.666667s150.666667 66.858667 150.666667 149.333333S595.210667 661.333333 512 661.333333z m0-64c47.552 0 86.101333-38.208 86.101333-85.333333S559.552 426.666667 512 426.666667c-47.552 0-86.101333 38.208-86.101333 85.333333s38.549333 85.333333 86.101333 85.333333z"
        fill="currentColor"
      ></path>
    </svg>
  </view>
</template>

<script setup name="ScanControl">
const { safeAreaInsets } = uni.getSystemInfoSync()

function onClick() {
  // 跳转页面
  uni.navigateTo({
    url: '/pages/redirectPage/redirectPage',
  })

  // uni.scanCode({
  //   // onlyFromCamera: true,
  //   success: function (res) {
  //     console.log('条码类型：' + res.scanType)
  //     console.log('条码内容：' + res.result)
  //   },
  //   fail: (fail) => {
  //     uni.showToast({
  //       icon: 'none',
  //       title: '请在相机中扫描',
  //     })
  //   },
  // })
}
</script>

<style scoped>
.maplibregl-ctrl {
  position: absolute;
  left: 75%;
  z-index: 9;
  display: flex;
  width: 24px;
  height: 24px;
  padding: 8px;
  color: #4d80f0;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  transition: all 0.1s linear;
  transform: translateX(-50%);
}
.maplibregl-ctrl:active {
  transform: translateX(-50%) scale(0.9);
}
</style>
