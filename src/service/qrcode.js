import { http } from '@/utils/http'

export function getQrCodeList(data) {
  return http.post('/api/biz/business/qrcode/public/getQrCodeList', data)
}
