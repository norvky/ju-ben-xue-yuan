import { useNotify } from 'wot-design-uni'
import { useLoginStore, useUserStore } from '@/store'
import { login } from '@/service/login'

function parseParameters(search) {
  const params = new URLSearchParams(search)
  const event = params.get('event')
  const id = params.get('id')
  const code = params.get('code')
  const state = params.get('state')

  const fullUrl = window.location.href
  const newUrl = fullUrl.replace(search, '')
  window.history.replaceState({}, document.title, newUrl)

  // wx 授权
  if (code && state === 'STATE') {
    handleLogin(code)
  }
}

async function handleLogin(wxCode) {
  const { showNotify } = useNotify()
  const loginStore = useLoginStore()

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
}

export default parseParameters
