<template>
  <my-table ref="tableRef" :dataSource="dataSource" @sizeChange="onSizeChange" @currentChange="onCurrentChange"
    @sortChange="onSortChange" @filterChange="onFilterChange">
    <template v-for="name in SLOT_NAMES" #[name]="row" :key="name">
      <component :is="name" :data="row"></component>
    </template>
  </my-table>
  <el-button @click="getSelectionRows">按钮</el-button>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ITableProps, ISortChangeParams, IFilterChangeParams } from '../type'
import MyTable from '../index.vue'
import Test1 from '@c/test1.vue'
import Test2 from '@c/test2.vue'

defineOptions({
  name: 'MyTable',
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
      prop: 'age',
      label: '年龄',
      width: '180',
      sortable: true,
      sortOrders: ['ascending', 'descending']
    },
    {
      prop: 'score',
      label: '分数',
      width: '180',
      sortable: true,
      sortOrders: ['ascending', 'descending']
    },
    {
      prop: 'sex',
      label: '性别',
      width: '180',
      columnKey: 'sex',
      filters: [
        {
          text: '男',
          value: '1'
        },
        {
          text: '女',
          value: '2'
        }
      ]
    },
    {
      prop: 'class',
      label: '班级',
      width: '180',
      columnKey: 'class',
      filterMultiple: false,
      filters: [
        {
          text: '一班',
          value: '1'
        },
        {
          text: '二班',
          value: '2'
        },
        {
          text: '三班',
          value: '3'
        }
      ]
    },
    {
      prop: 'address',
      label: '地址'
    }
  ],
  data: [
    {
      age: 16,
      sex: '男',
      date: '2016-05-03',
      class: "一班",
      name: 'Tom',
      score: 100,
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      age: 28,
      sex: '男',
      date: '2016-05-02',
      class: "一班",
      name: 'Tom',
      score: 90,
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      age: 20,
      sex: '女',
      date: '2016-05-04',
      class: "一班",
      name: 'Tom',
      score: 78,
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      age: 21,
      sex: '女',
      date: '2016-05-01',
      class: "二班",
      name: 'Tom',
      score: 84,
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      age: 32,
      sex: '男',
      date: '2016-05-02',
      class: "三班",
      name: 'Tom',
      score: 70,
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
  console.log(tableRef, 'tableRef');
}
const onCurrentChange = (currentPage: number) => {
  console.log(tableRef, 'tableRef');
}

const onSortChange = (sortInfo: ISortChangeParams) => {
  const { prop, order } = sortInfo
  // order === 'ascending', 传递 prop
  // order === 'descending', 传递 -prop
  console.log(prop, order, 'sortInfo')

}

const onFilterChange = (filter: IFilterChangeParams) => {
  console.log(filter, 'filter')
}

const getSelectionRows = () => {
  console.log(tableRef?.value?.multipleTableRef?.getSelectionRows())
}
</script>

<style lang="scss" scoped></style>
