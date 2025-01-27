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
          :disabled="loading"
          label="手机号"
          prop="phonenumber"
          v-model="model.phonenumber"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <!-- 验证码 -->
        <wd-input
          :disabled="loading"
          label="验证码"
          prop="verificationCode"
          v-model="model.verificationCode"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
        <view class="flex justify-center h-16" @click="getVerifyCode">
          <wd-img height="4rem" mode="heightFix" :src="verifyCode">
            <template #error>
              <view class="px-2 w-full h-full flex justify-center items-center bg-#eee">
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

      <view class="pt-4 px-4">
        <wd-button :loading="loading" @click="handleSubmit" block>提 交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script setup name="redirectPage">
import { getCaptchaImage } from '@/service/login'
import { useLoginStore } from '@/store'

const { showLoginPage, userStore } = inject('homeData')
const { VITE_WX_APPID } = import.meta.env
const { safeAreaInsets } = uni.getSystemInfoSync()
const loginStore = useLoginStore()

const form = ref()
const model = reactive({
  phonenumber: '',
  verificationCode: '',
  uuid: '',
})
const loading = ref(false)

// 验证码
const verifyCode = ref('https://wot-design-uni.netlify.app/logo.png')
function getVerifyCode() {
  getCaptchaImage().then((res) => {
    const { img, uuid } = res
    verifyCode.value = `data:image/png;base64,${img}`
    model.uuid = uuid
  })
}

function handleSubmit() {
  loading.value = true
  form.value
    .validate()
    .then(({ valid }) => {
      if (valid) {
        loginStore.setLoginInfo(model)
        // showLoginPage.value = false
        getWXCode()
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function getWXCode() {
  const url = window.location.href.replace(window.location.hash, '')
  const redirectURI = encodeURIComponent(url)
  const appid = VITE_WX_APPID
  const scope = 'snsapi_base' // 可选 snsapi_base snsapi_userinfo
  const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
  window.location.href = authUrl
}

getVerifyCode()
</script>

<style lang="scss" scoped></style>
