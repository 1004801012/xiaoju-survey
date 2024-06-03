const color = [
  '#55A8FD',
  '#36CBCB',
  '#FAD337',
  '#A6D6FF',
  '#A177DC',
  '#F46C73',
  '#FFBA62',
  '#ACE474',
  '#BEECD6',
  '#AFD2FF'
]
/*
 * @Description: 饼图配置
 * @CreateDate: 2024-04-30
 */
export default (data) => {
  return {
    color,
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      right: 12,
      top: 12
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        data
      }
    ]
  }
}