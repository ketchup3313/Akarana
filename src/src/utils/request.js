import axios from "axios";
const ENV = process.env.NODE_ENV;

import router from "../router/index";

// 创建axios实例  
const service = axios.create({
  timeout: 15000, // 请求超时时间
});
service.interceptors.request.use((config) => {
  const passURL = ['/api/login', '/api/reg']
  if (passURL.includes(config.url)) return config
  const tk = localStorage.getItem('@#@TOKEN')
  if (tk) {
    config.headers.Authorization = 'Bearer ' + tk
  } else {
    delete config.headers.Authorization
  }
  return config
})

service.interceptors.response.use((response) => {
  const { status, msg } = response.data
  if (status === 1 && msg === 'TOKEN 解析错误') {
    ElMessage({
      message: `${msg}`,
      type: "error",
    });
    localStorage.removeItem("@#@TOKEN");
    localStorage.removeItem("userInfo");
    router.push('/login');
  }
  return response
})


export default service;