import axios from "axios";
const ENV = process.env.NODE_ENV;
import store from "@/store";
import router from "../router/index";

// Create axios instance
const service = axios.create({
  timeout: 15000, // request timeout
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
  if (status === 1 && msg === 'Have not login !') {
    ElMessage({
      message: `${msg}`,
      type: "error",
    });
    store.commit('RESET_USERINFO');
    localStorage.removeItem("@#@TOKEN");
    router.push('/login');
  }
  return response
})


export default service;
