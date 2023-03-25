// import axios from 'axios';
// const baseURL = "http://localhost:8888/api"; 
// const instance = axios.create({
//   baseURL: 'http://localhost:8888/api/', // 服务器地址
//     timeout: 1000, // 超时时间
// });

// // 请求拦截器'
// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("@#@TOKEN");
//         if (token) {
//             config.headers.Authorization = token;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
// // 响应拦截器
// instance.interceptors.response.use(
//     (response) => {
//         return response.data;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default {
//   getUserInfo: (id) => instance.get(`mine/queryInfo?id=${id}`),
// };