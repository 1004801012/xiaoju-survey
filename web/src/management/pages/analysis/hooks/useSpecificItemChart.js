import { ref, computed } from 'vue'
import { questionChartsConfig } from '../config'
import dataFormateConfig from '../config/dataFormateConfig'

/**
 * @description: 分题统计图表
 * @param {*} chartType
 * @param {*} data
 * @return {*} chartData
 */
export default ({ questionType, data }) => {
  const chart = ref(null)
  const currentTypeIndex = ref(0)

  const chartType = computed(() => {
    const chartTypes = questionChartsConfig[questionType.value] || questionChartsConfig.default
    return chartTypes[currentTypeIndex.value]
  })

  const chartData = computed(() => dataFormateConfig[chartType.value](data))
  return {
    chart,
    chartType,
    chartData,
    currentTypeIndex
  }
}
