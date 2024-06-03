import axios from './base'

export const getRecycleList = (data) => {
  return axios.get('/survey/dataStatistic/dataTable', {
    params: {
      pageSize: 10,
      ...data
    }
  })
}

export const getSpecificStatisList = (data) => {
  return axios.get('/survey/dataStatistic/aggregationStatis', {
    params: {
      ...data
    }
  })
}
