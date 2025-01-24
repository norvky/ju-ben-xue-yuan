import { http } from '@/utils/http'

export function getCaptchaImage() {
  return http.get('/api/captchaImage')
}

// 登录/注册接口
export function login(data) {
  return http.post('/api/core/public/login', data)
}

// 获取JSAPI签名信息
export function getTkCfg(data) {
  return http.post('/api/biz/tx/gzh/public/getTkCfg', data)
}
