<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="">这是跳转页面</view>
</template>

<script setup name="redirectPage">
import { useUserStore } from '@/store'
const userStore = useUserStore()

const hasLogin = userStore.isLogined
setTimeout(() => {
  if (hasLogin) {
    console.log('跳转到首页')
    uni.switchTab({ url: '/pages/home/home' })
  } else {
    console.log('跳转到登录页')
    uni.redirectTo({ url: '/pages/login/login' })
  }
}, 1000)
</script>

<style lang="scss" scoped></style>
