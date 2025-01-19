<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view
    class="bg-white h-100vh overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
          label="用户名"
          label-width="100px"
          prop="name"
          clearable
          v-model="model.name"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-input
          label="手机号"
          label-width="100px"
          prop="phone"
          clearable
          v-model="model.phone"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
      </wd-cell-group>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script setup name="redirectPage">
import { useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
const userStore = useUserStore()

const { safeAreaInsets } = uni.getSystemInfoSync()

const hasLogin = userStore.isLogined
const { success: showSuccess } = useToast()

const model = reactive({
  name: '',
  phone: '',
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过',
        })

        userStore.setUserInfo({
          nickname: model.name,
          avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          phone: model.phone,
          token: 'token',
        })

        uni.navigateTo({
          url: '/pages/redirectPage/redirectPage',
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 12px;
}
</style>
