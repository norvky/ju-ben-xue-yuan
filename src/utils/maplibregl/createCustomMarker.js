import * as maplibregl from 'maplibre-gl'

export async function createCustomMarker(item, myMap) {
  const el = document.createElement('div')

  const response = await fetch(item.icon)
  const svgContent = await response.text()

  // 插入到 div 中
  el.innerHTML = svgContent

  // 获取 SVG 元素
  const svgElement = el.querySelector('svg')
  if (svgElement) {
    svgElement.style.width = `${item.iconSize[0]}px`
    svgElement.style.height = `${item.iconSize[1]}px`
  }

  return new maplibregl.Marker({ element: el }).setLngLat([item.lng, item.lat]).addTo(myMap)
}

export async function createRedEnvelopeMarker(item, myMap) {
  const el = document.createElement('div')
  const url = import.meta.env.VITE_APP_BASE_URL + item.qrCodeIcon
  const response = await fetch(url)
  const svgContent = await response.text()

  // 插入到 div 中
  el.innerHTML = svgContent

  // 获取 SVG 元素
  const svgElement = el.querySelector('svg')
  if (svgElement) {
    svgElement.style.width = `${item.iconSize[0] || 32}px`
    svgElement.style.height = `${item.iconSize[1] || 32}px`
  }

  // latLonInfo: "110.680862,22.333145"
  const lngLat = item.latLonInfo.split(',').map(parseFloat)
  // setTimeout(() => {
  //   console.log('el: %o', el)
  //   myMap.flyTo({ center: lngLat })
  // }, 3000)

  return new maplibregl.Marker({ color: 'red' }).setLngLat(lngLat).addTo(myMap)
}
