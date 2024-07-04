<template>
  <my-table
    ref="tableRef"
    :dataSource="dataSource"
    @sizeChange="onSizeChange"
    @currentChange="onCurrentChange"
  >
    <template v-for="name in SLOT_NAMES" #[name]="row" :key="name">
      <component :is="name" :data="row"></component>
    </template>
  </my-table>
  <el-button @click="getSelectionRows">按钮</el-button>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ITableProps } from '../type'
import MyTable from '../index.vue'
import Test1 from '@c/test1.vue'
import Test2 from '@c/test2.vue'

defineOptions({
  components: {
    Test1,
    Test2
  }
})
const tableRef = ref<InstanceType<typeof MyTable> | null>(null)
const SLOT_NAMES = ['Test1', 'Test2']
const dataSource = reactive<ITableProps<any>>({
  columns: [
    {
      type: 'selection',
      width: '55'
    },
    {
      prop: 'hide',
      label: '隐藏',
      width: '180',
      hidden: true
    },
    {
      prop: 'date',
      label: '日期',
      width: '180',
      slot: 'Test1'
    },
    {
      prop: 'name',
      label: '姓名',
      width: '180',
      slot: 'Test2'
    },
    {
      prop: 'address',
      label: '地址'
    }
  ],
  data: [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
  ],
  pigination: {
    total: 7,
    pageSize: 2,
    currentPage: 1
  }
})
const onSizeChange = (pageSize: number) => {
  console.log(pageSize, 'pageSize')
}
const onCurrentChange = (currentPage: number) => {
  console.log(currentPage, 'currentPage')
}
const getSelectionRows = () => {
  console.log(tableRef?.value?.multipleTableRef?.getSelectionRows())
}
</script>

<style lang="scss" scoped></style>
