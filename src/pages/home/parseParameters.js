import { useNotify } from 'wot-design-uni'
import { useLoginStore, useUserStore } from '@/store'
import { login } from '@/service/login'

function replaceState(search) {
  const fullUrl = window.location.href
  const newUrl = fullUrl.replace(search, '')
  window.history.replaceState({}, document.title, newUrl)
}

function parseParameters(search, showLoginPage) {
  const params = new URLSearchParams(search)
  const event = params.get('event')
  const id = params.get('id')
  const code = params.get('code')
  const state = params.get('state')
  const formKey = params.get('formKey')

  replaceState(search)

  // wx 授权
  if (code && state === 'STATE') {
    handleLogin(code)
  } else if (event === '101') {
    handleLottery(formKey, showLoginPage)
  }
}

async function handleLogin(wxCode) {
  const { showNotify } = useNotify()
  const loginStore = useLoginStore()
  const formKey = loginStore.formKey

  showNotify({
    message: '正在登录...',
    color: '#fff',
    background: '#9E9E9E',
    duration: 0,
  })

  setTimeout(() => {
    loginStore.clearLoginInfo()
  }, 100)

  const { code, msg, data } = await login({
    ...loginStore.loginInfo,
    code: wxCode,
  })

  if (code !== 200) {
    showNotify({
      message: msg,
      type: 'error',
    })
    return
  }

  const { token } = data
  const userStore = useUserStore()
  userStore.setUserInfo({ token })

  showNotify({
    message: '登录成功',
    type: 'success',
  })

  formKey && handleLottery(formKey)
}

async function handleLottery(formKey, showLoginPage) {
  const userStore = useUserStore()
  const loginStore = useLoginStore()

  if (userStore.isLogined) {
    const { origin } = window.location
    const token = userStore.userInfo.token
    let lotteryUrl = `${origin}/h5/lottery/index.html?tk=${token}`
    lotteryUrl += formKey ? `&formKey=${formKey}` : ''
    window.location.href = lotteryUrl
  } else {
    loginStore.setFormKey(formKey)
    showLoginPage.value = true
  }
}

export default parseParameters
