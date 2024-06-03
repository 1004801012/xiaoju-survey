<template>
  <div class="specific-item">
    <div class="specific-item__title">
      <p v-html="filterXSS(specificData.title)"></p>
      <p v-if="questionTypeDesc" class="type">{{ questionTypeDesc }}</p>
    </div>
    <div class="specific-item__content">
      <div class="chart-wrapper">
        <div ref="chart" class="chart"></div>
      </div>
      <div class="table-wrapper">
        <data-table :table-data :table-min-height />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, defineProps, computed, watch, onMounted } from 'vue'
import DataTable from './DataTable.vue'
import { specificItemListHead, summaryType, summaryItemConfig } from '../config'
import useCharts from '@/management/hooks/useCharts'
import useSpecificItemChart from '../hooks/useSpecificItemChart'
import { filterXSS } from '@/common/xss'
import { menuItems } from '@/management/config/questionMenuConfig'
import _cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  specificData: {
    type: Object,
    required: true
  }
})

const questionType = computed(() => {
  return props?.specificData?.type
})

const questionTypeDesc = computed(() => {
  return menuItems?.[questionType.value]?.title || ''
})

// 表格数据
const specificItemListBody = computed(() => {
  try {
    const aggregation = _cloneDeep(props?.specificData?.data?.aggregation)
    const submitionCount = props?.specificData?.data?.submitionCount
    const summaryList = summaryItemConfig[questionType.value]
    // 增加聚合信息
    if (summaryList?.length) {
      summaryList.forEach((item, index) => {
        const { type, text, field, max, min } = item
        if (text && field && type === summaryType.between) {
          aggregation.push({
            id: `summary_${index}`,
            text,
            count: aggregation.reduce((n, item) => {
              if (item[field] >= min && item[field] <= max) {
                return n + item.count
              }
              return n
            }, 0)
          })
        }
      })
    }

    return (
      aggregation?.map((item) => {
        const { id, count, text } = item
        const percent = `${((count / submitionCount) * 100).toFixed(1)}%`
        return {
          id,
          count,
          text,
          percent
        }
      }) || []
    )
  } catch (e) {
    console.log(e)
    return []
  }
})

const specificItemState = reactive({
  tableData: {
    total: 0,
    listHead: specificItemListHead,
    listBody: specificItemListBody
  },
  tableMinHeight: '0px'
})

const { tableData, tableMinHeight } = toRefs(specificItemState)

const { chart, chartType, chartData } = useSpecificItemChart({
  questionType,
  data: props?.specificData?.data
})

onMounted(() => {
  // 需要获取图表dom，所以得在mounted中执行
  const { changeType } = useCharts(chart.value, chartType.value, chartData.value)

  watch(chartType, () => {
    changeType(chartType.value, chartData.value)
  })
})
</script>

<style lang="scss" scoped>
.specific-item {
  padding: 32px 12px;
  border-bottom: 1px solid #efefef;

  &:nth-last-of-type(1) {
    border-bottom: none;
  }

  &__title {
    font-size: 14px;
    color: #333;
    font-weight: 600;
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    .type {
      font-size: 12px;
      margin-left: 8px;
      color: white;
      background-color: var(--primary-color);
      border-radius: 6px 3px;
      padding: 3px 6px;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    gap: 50px;

    .chart-wrapper {
      flex: auto;
      width: 50%;
      min-width: 300px;
      height: 320px;
      max-width: 1000px;
      box-shadow: 0 2px 8px -2px rgba(136, 136, 157, 0.2);
      border-radius: 2px;
      padding: 24px;

      .chart {
        width: 100%;
        height: 100%;
      }
    }

    .table-wrapper {
      flex: auto;
      width: 50%;
      min-width: 300px;
      max-width: 1000px;
    }
  }

  @media screen and (min-width: 1660px) {
    &__content {
      gap: 80px;
      .chart-wrapper {
        height: 400px;
      }
    }
  }
}
</style>
