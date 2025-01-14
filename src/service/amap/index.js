import { http } from '@/utils/http'

const baseUrl = '/amap/v5/direction'

/** GET 请求 */
export const getNewRoute = (params = {}, type = 'walking') => {
  params = {
    isindoor: 0,
    origin: '116.466485,39.995197',
    destination: '116.46424,40.020642',
    key: '389802a71710ebfd0a3e9c45f97d1569',
    show_fields: 'polyline',
    ...params,
  }

  return http.get(`${baseUrl}/${type}`, params)
}
