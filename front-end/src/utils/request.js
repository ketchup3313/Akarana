import axios from "axios";
const ENV = process.env.NODE_ENV;
// 创建axios实例
const host = ENV === "dev" ? "http://127.0.0.1" : "https://api.ketchup3313.com/";
const service = axios.create({
  baseURL: host, // api的base_url
  timeout: 5000, // 请求超时时间
});

// 请求拦截
service.interceptors.request.use((config) => {
  console.log(config);
  if (config.url.indexOf("register") < 0 && config.url.indexOf("login") < 0) {
    config.headers.Authorization = localStorage.getItem("token");
  }
  return config;
});

export default service;
