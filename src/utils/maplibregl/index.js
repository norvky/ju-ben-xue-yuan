import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { createCustomMarker, createRedEnvelopeMarker } from './createCustomMarker'
import { getQrCodeList } from '@/service/qrcode'

let myMap = null
let myLocationMarker = null
const redEnvelopeMarkers = []
let redEnvelopesDataBak = ''

function initMap(options) {
  const { container, center } = options

  myMap = new maplibregl.Map({
    container,
    style: {
      version: 8,
      sources: {
        'gaode-map': {
          type: 'raster',
          tiles: [
            'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            // 'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
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
    center: center || [110.68212993376392, 22.331164026494434],
    zoom: 15,
    attributionControl: false, // 禁用版权控件
  })

  myMap.on('click', (res) => {
    console.log('myMap clicked:', res.lngLat)
  })

  return myMap
}

async function createMarker(item) {
  let marker = null

  if ('icon' in item) {
    marker = createCustomMarker(item, myMap)
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

function updateMyLocation(params) {
  console.log('params: %o', params)
  const lngLat = [params.longitude, params.latitude]
  if (myLocationMarker) {
    myLocationMarker.setLngLat(lngLat)
  } else {
    myLocationMarker = new maplibregl.Marker()
    myLocationMarker.setLngLat(lngLat).addTo(myMap)
    // myMap.setCenter(lngLat)
  }
}

function updateRedEnvelopes() {
  return new Promise((resolve, reject) => {
    getQrCodeList({}).then((res) => {
      const { code, data } = res
      if (code !== 200) {
        reject(res)
        return
      }

      const dataStr = JSON.stringify(data)
      if (dataStr === redEnvelopesDataBak) {
        console.log('数据未变化')
        resolve()
        return
      }

      console.log('数据变化')
      redEnvelopesDataBak = dataStr
      redEnvelopeMarkers.forEach((marker) => {
        marker.remove()
      })
      redEnvelopeMarkers.length = 0

      data.forEach((item) => {
        const _marker = createRedEnvelopeMarker(item, myMap)
        redEnvelopeMarkers.push(_marker)
      })
      resolve()
    })
  })
}

function fitRedEnvelopes() {
  const bounds = new maplibregl.LngLatBounds()
  redEnvelopeMarkers.forEach((marker) => {
    bounds.extend(marker.getLngLat())
  })
  myMap.fitBounds(bounds, { padding: 100, duration: 2000 })
}

export { initMap, createMarker, updateMyLocation, updateRedEnvelopes, fitRedEnvelopes }
