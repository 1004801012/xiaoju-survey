<template>
  <div class="data-table-page">
    <template v-if="tableData.total">
      <div class="menus">
        <el-switch
          :model-value="isShowOriginData"
          active-text="是否展示原数据"
          @input="onIsShowOriginChange"
        >
        </el-switch>
      </div>
    </template>

    <template v-if="tableData.total">
      <DataTable :main-table-loading :table-data />
      <el-pagination
        background
        layout="prev, pager, next"
        popper-class="analysis-pagination"
        :total="tableData.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
    <div v-else>
      <EmptyIndex :data="noDataConfig" />
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'

import EmptyIndex from '@/management/components/EmptyIndex.vue'
import { getRecycleList } from '@/management/api/analysis'

import DataTable from '../components/DataTable.vue'
import { noDataConfig } from '../config'

export default {
  name: 'AnalysisPage',
  data() {
    return {
      mainTableLoading: false,
      tableData: {
        total: 0,
        listHead: [],
        listBody: []
      },
      noDataConfig,
      currentPage: 1,
      isShowOriginData: false,
      tmpIsShowOriginData: false
    }
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    async init() {
      if (!this.$route.params.id) {
        ElMessage.error('没有传入问卷参数~')
        return
      }
      this.mainTableLoading = true
      try {
        const res = await getRecycleList({
          page: this.currentPage,
          surveyId: this.$route.params.id,
          isDesensitive: !this.tmpIsShowOriginData // 发起请求的时候，isShowOriginData还没改变，暂存了一个字段
        })

        if (res.code === 200) {
          const listHead = this.formatHead(res.data.listHead)
          this.tableData = { ...res.data, listHead }
          this.mainTableLoading = false
        }
      } catch (error) {
        ElMessage.error('查询回收数据失败，请重试')
      }
    },
    handleCurrentChange(current) {
      if (this.mainTableLoading) {
        return
      }
      this.currentPage = current
      this.init()
    },
    formatHead(listHead = []) {
      const head = []

      listHead.forEach((headItem) => {
        head.push({
          field: headItem.field,
          title: headItem.title
        })

        if (headItem.othersCode?.length) {
          headItem.othersCode.forEach((item) => {
            head.push({
              field: item.code,
              title: `${headItem.title}-${item.option}`
            })
          })
        }
      })

      return head
    },
    async onIsShowOriginChange(data) {
      if (this.mainTableLoading) {
        return
      }
      // console.log(data)
      this.tmpIsShowOriginData = data
      await this.init()
      this.isShowOriginData = data
    }
  },

  components: {
    DataTable,
    EmptyIndex
  }
}
</script>

<style lang="scss" scoped>
.data-table-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.menus {
  margin-bottom: 20px;
}

:deep(.el-pagination) {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.data-list {
  margin-bottom: 20px;
}
</style>
