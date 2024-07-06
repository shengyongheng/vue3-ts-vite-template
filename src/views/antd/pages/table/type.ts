import { defineComponent } from 'vue'
import type { TableProps, TableColumnCtx } from 'element-plus'

interface IExtraColumnsProps {
  hidden?: boolean
  slot?: string
  renderHeader?: ReturnType<typeof defineComponent>
  render?: ReturnType<typeof defineComponent>
}

interface IPiginationProps {
  currentPage: number
  pageSize: number
  total: number
}

interface ITableProps<T = any> extends TableProps<T> {
  columns: Array<Partial<TableColumnCtx<T>> & IExtraColumnsProps> // 列配置
  pigination?: IPiginationProps // 分页配置
}

interface ISortChangeParams {
  column: any, prop: string, order: any
}

interface IFilterChangeParams {
  [key: string]: string[]
}

export type { ITableProps, ISortChangeParams, IFilterChangeParams }
