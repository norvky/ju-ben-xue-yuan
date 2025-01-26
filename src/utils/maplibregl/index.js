import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { createCustomMarker, createRedEnvelopeMarker } from './createCustomMarker'
import { getQrCodeList } from '@/service/qrcode'

let myMap = null
let myLocationMarker = null

function initMap(mapId) {
  myMap = new maplibregl.Map({
    container: mapId,
    style: {
      version: 8,
      sources: {
        'gaode-map': {
          type: 'raster',
          tiles: [
            'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
          ],
          tileSize: 256,
          attribution: '© <a href="https://www.amap.com/">高德地图</a>',
        },
      },
      layers: [
        {
          id: 'gaode-map-layer',
          type: 'raster',
          source: 'gaode-map',
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    },
    center: [108.38025476582408, 22.762367277980474],
    zoom: 17,
    attributionControl: false, // 禁用版权控件
  })

  myMap.on('click', (res) => {
    console.log('myMap clicked:', res.lngLat)
  })

  myLocationMarker = new maplibregl.Marker()
  uni.getLocation({
    type: 'wgs84',
    success: function (res) {
      // const lngLat = [res.longitude, res.latitude]
      const lngLat = [108.38025476582408, 22.762367277980474]
      myLocationMarker.setLngLat(lngLat).addTo(myMap)
      myMap.setCenter(lngLat)
    },
  })

  return myMap
}

async function createMarker(item) {
  let marker = null

  if ('icon' in item) {
    marker = await createCustomMarker(item, myMap)
  } else {
    marker = new maplibregl.Marker({ color: 'red' })
      .setLngLat(item)
      // .setPopup(new maplibregl.Popup({ offset: 25 }).setText(item.desc))
      .addTo(myMap)
  }

  const markerElement = marker.getElement()
  markerElement.style.cursor = 'pointer'

  return marker
}

function updateRedEnvelopes() {
  getQrCodeList({}).then((res) => {
    const { code, data } = res
    if (code !== 200) {
      return
    }

    data.forEach((item) => {
      createRedEnvelopeMarker(item, myMap)
    })
  })
}

export { initMap, createMarker, updateRedEnvelopes }
