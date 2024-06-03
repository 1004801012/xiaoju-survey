<template>
  <div v-if="data.length" class="specific-statis-page">
    <SpecificItem v-for="specificData in data" :key="specificData.field" :specificData />
  </div>
  <div v-else>
    <EmptyIndex :data="noDataConfig" />
  </div>
</template>

<script setup>
import SpecificItem from '../components/SpecificItem.vue'
import { noDataConfig } from '../config'

import EmptyIndex from '@/management/components/EmptyIndex.vue'
import { ref, onMounted } from 'vue'
import { getSpecificStatisList } from '@/management/api/analysis'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = ref([])

const initData = async () => {
  const res = await getSpecificStatisList({
    surveyId: route.params.id
  })
  data.value = res.data
}

onMounted(initData)
</script>

<style lang="scss" scoped>
.specific-statis-page {
  height: 100%;
  background: #fff;
  padding: 0 24px;
  overflow-y: auto;
}
</style>
