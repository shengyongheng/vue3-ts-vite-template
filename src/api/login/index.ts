import request from "../../utils/request"

const login = (url: string, params: any) => {
    return request.get(url, params)
}
export default {
    login
}