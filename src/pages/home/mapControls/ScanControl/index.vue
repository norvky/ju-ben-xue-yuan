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
        d="M195.047619 658.285714v170.666667h182.832762v73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857v-170.666667h73.142857z m707.047619 0v170.666667a73.142857 73.142857 0 0 1-73.142857 73.142857h-182.881524v-73.142857H828.952381v-170.666667h73.142857z m-97.523809-182.857143v73.142858H219.428571v-73.142858h585.142858zM828.952381 121.904762a73.142857 73.142857 0 0 1 73.142857 73.142857v170.666667h-73.142857V195.047619h-182.857143V121.904762H828.952381zM377.904762 121.904762v73.142857H195.047619v170.666667H121.904762V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h182.857143z"
        fill="currentColor"
      ></path>
    </svg>
  </view>
</template>

<script setup name="ScanControl">
import wx from 'weixin-js-sdk'
const { safeAreaInsets } = uni.getSystemInfoSync()

function onClick() {
  wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
      const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
      console.log('scanQRCode: ', result)
    },
  })
}
</script>

<style scoped>
.maplibregl-ctrl {
  position: absolute;
  left: 50%;
  z-index: 9;
  display: flex;
  width: 40px;
  height: 40px;
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
