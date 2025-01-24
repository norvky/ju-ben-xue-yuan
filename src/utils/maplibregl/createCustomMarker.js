import * as maplibregl from 'maplibre-gl'

async function createCustomMarker(item, myMap) {
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

export default createCustomMarker
