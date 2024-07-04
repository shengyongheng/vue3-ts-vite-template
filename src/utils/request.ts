import axios from 'axios'
import { ElMessage } from 'element-plus'
import baseURL from '../config'
import { getToken } from './utils'
import type {
  AxiosInstance,
  AxiosRequestConfig, // 旧版本配置
  InternalAxiosRequestConfig, // 最新版本配置
  AxiosResponse
} from 'axios'
// 环境变量取值
let env = import.meta.env.MODE as 'development' | 'production'

// 假设我们某个项目后端接口不管请求成功与失败，返回的结构永远是code、message、results的话我们可以定义一个这样的数据类型。
interface Result<T> {
  // T 代表后端返回数据的格式
  code: number
  message: string
  results: T
}
export class Request {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    baseURL: baseURL[env],
    timeout: 60000,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
  constructor (config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getToken() as string | null
        if (token) {
          config.headers!.Authorization = token
        }
        return config
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        ElMessage.error(err)
        return Promise.reject(err)
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res.data
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let message = ''
        let status = err.response?.status
        switch (status) {
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            // 这里可以做清空storage并跳转到登录页的操作
            break
          case 403:
            message = '拒绝访问(403)'
            break
          case 404:
            message = '请求出错(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          case 501:
            message = '服务未实现(501)'
            break
          case 502:
            message = '网络错误(502)'
            break
          case 503:
            message = '服务不可用(503)'
            break
          case 504:
            message = '网络超时(504)'
            break
          case 505:
            message = 'HTTP版本不受支持(505)'
            break
          default:
            message = `连接出错(${status})!`
        }
        // 这里错误消息可以使用全局弹框展示出来
        ElMessage.error(message)
        // 比如element plus 可以使用 ElMessage
        // ElMessage({
        //   showClose: true,
        //   message: `${message}，请检查网络或联系管理员！`,
        //   type: "error",
        // });
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response)
      }
    )
  }
  // 定义请求方法
  public request (config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }
  public get<T = any> (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config)
  }
  public post<T = any> (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config)
  }
  public put<T = any> (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config)
  }
  public delete<T = any> (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config)
  }
}
// 默认导出Request实例
export default new Request({})
