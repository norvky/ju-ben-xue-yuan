import * as maplibregl from 'maplibre-gl'
import redEnvelopeSvg from '@/static/images/map/red-envelope.svg'

const baseURL = import.meta.env.VITE_SERVER_BASEURL

export function createCustomMarker(item, myMap) {
  const el = document.createElement('div')

  const fn = async () => {
    const response = await fetch(item.icon)
    const svgContent = await response.text()
    el.innerHTML = svgContent

    const svgElement = el.querySelector('svg')
    if (svgElement) {
      svgElement.style.width = `${item.iconSize[0]}px`
      svgElement.style.height = `${item.iconSize[1]}px`
    }
  }
  fn()

  return new maplibregl.Marker({ element: el }).setLngLat([item.lng, item.lat]).addTo(myMap)
}

export function createRedEnvelopeMarker(item, myMap) {
  const redEnvelopeContainer = document.createElement('div')
  redEnvelopeContainer.className = 'red-envelope-container'

  const img = new Image()
  img.src = baseURL + item.qrCodeIcon
  img.width = item.iconSize?.[0] || 48
  img.height = item.iconSize?.[1] || 48
  img.onerror = () => {
    console.log('图片加载失败')
    // img.src = 'https://maplibre.org/maplibre-gl-js/docs/assets/logo.svg'
    img.src = redEnvelopeSvg
  }

  // 添加波纹
  const rippleEffect = document.createElement('div')
  rippleEffect.className = 'red-envelope-ripple-effect'

  redEnvelopeContainer.appendChild(rippleEffect)
  redEnvelopeContainer.appendChild(img)

  // latLonInfo: "110.680862,22.333145"
  const lngLat = item.latLonInfo.split(',').map(parseFloat)
  const popup = new maplibregl.Popup({ offset: 25 }).setText(item.qrCodeName)
  // .setHTML(`
  //   <view class="flex flex-col items-center">
  //     <image src="${baseURL + item.qrCodeIcon}" mode="widthFix" />
  //     <text class="text-xs text-gray-500">${item.redEnvelopeName}</text>
  //   </view>
  // `)

  return new maplibregl.Marker({ element: redEnvelopeContainer })
    .setLngLat(lngLat)
    .setPopup(popup)
    .addTo(myMap)
}
