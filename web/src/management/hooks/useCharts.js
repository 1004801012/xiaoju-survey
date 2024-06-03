import * as echarts from 'echarts'
import useResizeObserver from './useResizeObserver'
import { getOption } from '@/management/config/chartOption'


/**
 * 绘制图表
 * @param {Object} el
 * @param {String} type
 * @param {Array} data
 */
export default (el, type, data) => {
  const chart = echarts.init(el)
  const option = getOption[type](data)

  chart.setOption(option, true)

  const resize = () => {
    chart.resize()
  }

  useResizeObserver(el, resize)

  const changeType = (type, data) => {
    chart.setOption(getOption[type](data), true)
  }

  return { chart, resize, changeType }
}
