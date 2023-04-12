/**
 * 假设后端返回的数据格式为
 * {
 *    code,
 *    data,
 *    message,
 * }
 */
interface BEDataType<T = any> {
    code: number
    data: T
    message: string
}