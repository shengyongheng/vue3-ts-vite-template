import request from "../../utils/request"

const login = (url: string, data: any) => {
    return request.post(url, data)
}
export default {
    login
}