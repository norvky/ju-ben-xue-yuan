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
  <view class="bg-white p-4" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
          label="手机号"
          prop="phone"
          v-model="model.phone"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <!-- 验证码 -->
        <wd-input
          label="验证码"
          prop="code"
          v-model="model.code"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
        <view class="flex justify-center bg-#eee h-16" @click="getVerifyCode">
          <wd-img height="4rem" mode="heightFix" :src="verifyCode">
            <template #error>
              <view class="w-full h-full flex justify-center items-center">
                加载失败，请点击刷新
              </view>
            </template>
            <template #loading>
              <view class="w-full h-full flex justify-center items-center">
                <wd-loading />
              </view>
            </template>
          </wd-img>
        </view>
      </wd-cell-group>

      <view class="footer">
        <wd-button @click="handleSubmit" block>提 交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script setup name="redirectPage">
const { showLoginPage, userStore } = inject('homeData')
const { safeAreaInsets } = uni.getSystemInfoSync()

const form = ref()
const model = reactive({
  phone: '',
  code: '',
})

// 验证码
const verifyCode = ref('https://wot-design-uni.netlify.app/logo.png')
function getVerifyCode() {
  verifyCode.value = 'https://wot-design-uni.netlify.app/logo.png'
}

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        userStore.setUserInfo({
          nickname: `剧中人${Date.now()}`,
          avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          phone: model.phone,
          token: 'token',
        })

        showLoginPage.value = false
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
