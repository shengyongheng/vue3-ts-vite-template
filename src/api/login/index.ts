import request from "@/utils/request";

const login = (params: any) => {
  return request.get("url", params);
};
export default {
  login,
};
