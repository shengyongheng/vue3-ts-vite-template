import request from '@/utils/request'
const addUndergraduate = (params: {
  name: string
  age: string
  sex: string
}) => {
  return request.post('/api/add-undergraduate', params)
}
export { addUndergraduate }
