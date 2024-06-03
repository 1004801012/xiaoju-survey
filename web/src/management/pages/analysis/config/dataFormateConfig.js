
// 饼图数据处理
const pie = (data) => {
  const aggregation = data?.aggregation
  return aggregation?.map?.((item) => {
    const { id, count, text } = item
    return {
      id,
      value: count,
      name: text
    }
  }) || []
}
// 柱状图数据处理
const bar = (data) => {
  const aggregation = data?.aggregation
  return aggregation?.map?.((item) => {
    const { id, count, text } = item
    return {
      id,
      value: count,
      name: text
    }
  }) || []
}
// 仪表盘数据处理
const gauge = (data) => {
  return parseFloat(data?.summary?.nps) || 0
}

export default {
  pie,
  bar,
  gauge
}
