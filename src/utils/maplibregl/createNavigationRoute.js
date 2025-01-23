import gcoord from 'gcoord'
import { getNewRoute } from '@/service/amap/index'

function createLayer() {
  myMap.on('load', () => {
    mapReady.value = true
    myMap.addSource('route-source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [], // 初始为空
      },
    })

    // 添加路线图层
    myMap.addLayer({
      id: 'route-layer',
      type: 'line',
      source: 'route-source',
      paint: {
        'line-color': '#ff0000', // 线的颜色
        'line-width': 3, // 线的宽度
      },
    })
  })
}

function createNavigationRoute(origin, destination) {
  const originGCJ02 = gcoord.transform(origin, gcoord.WGS84, gcoord.GCJ02)
  const destinationGCJ02 = gcoord.transform(destination, gcoord.WGS84, gcoord.GCJ02)

  getNewRoute({
    origin: originGCJ02.join(','),
    destination: destinationGCJ02.join(','),
  }).then((res) => {
    const { route } = res
    console.log('res - data', route)

    // 绘制路线
    updateRoute(route)
  })
}

// 更新路线的函数
function updateRoute(route) {
  // 将高德地图的 GCJ-02 坐标转换为 WGS84 坐标
  const routeGeoJSON = {
    type: 'FeatureCollection',
    features: route.paths[0].steps.map((step) => {
      const coordinates = step.polyline.split(';').map((point) => {
        const [lng, lat] = point.split(',').map(parseFloat)
        return gcoord.transform([lng, lat], gcoord.GCJ02, gcoord.WGS84)
      })
      return {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
        },
        properties: {
          instruction: step.instruction,
          distance: step.step_distance,
        },
      }
    }),
  }

  // 更新已有的数据源
  const routeSource = myMap.getSource('route-source')
  if (routeSource) {
    routeSource.setData(routeGeoJSON)
  }
}

export default createNavigationRoute
