import axios from "axios";
// 创建axios实例
const host=ENV==='dev'?'http://localhost:3000':'http://www.baidu.com'
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    if(config.url.indexOf('register')<0&&config.url.indexOf('login')<0){
        config.headers['Authorization']=localStorage.getItem('token')
        
    
    }
})
