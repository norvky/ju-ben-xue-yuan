<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人中心',
  },
}
</route>

<template>
  <view
    class="relative bg-#f6f6f7 overflow-auto h-full"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <wd-button
      class="!absolute left-2 top-2 z-1 !text-#3C1E1C"
      style="border: 1px solid #e6e6e7"
      type="icon"
      icon="home"
      @click="goToHome"
    />

    <view class="">
      <view class="center bg-#fff mb-4 p-6 pt-10">
        <wd-img
          :width="100"
          :height="100"
          round
          :src="avatarImg"
          style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2)"
        />
      </view>

      <wd-cell-group border>
        <wd-cell title="昵称" :value="userStore?.userInfo?.nickname || '-'" />
        <wd-cell title="手机号" :value="userStore?.userInfo?.phone || '-'" />
      </wd-cell-group>

      <view class="b-rounded" style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #ccc">
        <view class="text-center text-xl">徽章展示</view>

        <view class="mt-2 grid grid-cols-3 gap-2">
          <view v-for="i in 12" :key="i" class="flex justify-center">
            <wd-img :width="50" :height="50" round :src="logo" />
          </view>
        </view>
      </view>

      <view class="b-rounded" style="padding: 0.5rem; margin-top: 1rem; border: 1px solid #ccc">
        <view class="text-center text-xl">奖励展示</view>

        <view class="mt-2 grid grid-cols-1 gap-2">
          <view v-for="i in 5" :key="i" class="flex bg-#eee">
            <wd-img :width="50" :height="50" round :src="logo" />
          </view>
        </view>
      </view>
    </view>

    <view class="mt-4 p-2 mb-8 flex justify-center">
      <wd-button type="error" @click="loginOut">退出登录</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import logo from '@/static/logo.jpg'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const userStore = useUserStore()

const props = defineProps({
  goToHomeFn: null,
})

const avatarImg = computed(() => {
  return userStore?.userInfo?.avatar || logo
})

function goToHome() {
  // uni.switchTab({ url: '/pages/home/home' })
  props.goToHomeFn && props.goToHomeFn()
}

function loginOut() {
  userStore.reset()

  // 提示
  uni.showToast({
    title: '退出登录成功',
    icon: 'success',
  })

  goToHome()
}
</script>

<style lang="scss" scoped>
//
</style>
