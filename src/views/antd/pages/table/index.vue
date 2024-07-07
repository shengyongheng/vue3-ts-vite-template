<template>
  <el-table ref="multipleTableRef" :data="dataSource.data" style="width: 100%" @sort-change="handleSortChange"
    @filter-change="handleFilterChange">
    <el-table-column v-for="column in computedColumns" :key="column.prop" :prop="column.prop" :label="column.label"
      :width="column.width" :type="column.type" :filters="column.filters" :sortable="column.sortable"
      :sort-orders="column.sortOrders" :column-key="column.columnKey" :filter-multiple="column.filterMultiple">
      <template #default="scope" v-if="column.slot">
        <slot :name="column.slot" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="dataSource?.pigination" :currentPage="dataSource?.pigination?.currentPage"
    :page-size="dataSource?.pigination?.pageSize" :page-sizes="[1, 2, 3, 4, 5]"
    layout="total, sizes, prev, pager, next, jumper" :total="dataSource?.pigination?.total"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import { ElTable } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import { ITableProps, ISortChangeParams, IFilterChangeParams } from './type'
interface IProps {
  tableRef?: InstanceType<typeof ElTable>
  dataSource: ITableProps<any>
}
const { dataSource } = defineProps<IProps>()
const emits = defineEmits<{
  (event: 'sizeChange', pageSize: number): void
  (event: 'currentChange', currentPage: number): void
  (event: 'sortChange', data: ISortChangeParams): void
  (event: 'filterChange', data: IFilterChangeParams): void
}>()

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

const filters = reactive<IFilterChangeParams>({});

onMounted(() => {
  if (dataSource.columns) {
    dataSource.columns.forEach(item => {
      if (item.columnKey) {
        filters[item.columnKey] = []
      }
    })
  }
})

const computedColumns = computed(() =>
  dataSource.columns.filter(item => !item.hidden)
)
const handleSizeChange = (pageSize: number) => {
  console.log(pageSize, 'pageSize-Table')
  emits('sizeChange', pageSize)
}
const handleCurrentChange = (currentPage: number) => {
  console.log(currentPage, 'currentPage-Table')
  emits('currentChange', currentPage)
}

const handleSortChange = (data: ISortChangeParams) => {
  console.log(data, 'sort-Table')
  emits('sortChange', data)
}

const handleFilterChange = (filter: IFilterChangeParams) => {
  const newfilters = { ...filters, ...filter }
  filters[Object.keys(filter)[0]] = filter[Object.keys(filter)[0]]
  emits('filterChange', newfilters)
}

defineExpose({
  multipleTableRef,
})
</script>
