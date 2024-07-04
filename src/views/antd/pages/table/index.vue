<template>
  <el-table ref="multipleTableRef" :data="dataSource.data" style="width: 100%">
    <el-table-column
      v-for="column in computedColumns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :type="column.type"
    >
      <template #default="scope" v-if="column.slot">
        <slot :name="column.slot" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-if="dataSource?.pigination"
    :currentPage="dataSource?.pigination?.currentPage"
    :page-size="dataSource?.pigination?.pageSize"
    :page-sizes="[1, 2, 3, 4, 5]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="dataSource?.pigination?.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { ElTable } from 'element-plus'
import { computed, ref } from 'vue'
import type { ITableProps } from './type'
interface IProps {
  tableRef?: InstanceType<typeof ElTable>
  dataSource: ITableProps<any>
}
const { dataSource } = defineProps<IProps>()
const emits = defineEmits<{
  (event: 'sizeChange', pageSize: number): void
  (event: 'currentChange', currentPage: number): void
}>()

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

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

defineExpose({
  multipleTableRef
})
</script>
