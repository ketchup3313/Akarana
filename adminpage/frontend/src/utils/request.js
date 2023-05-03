import router from '@/router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

/**
 * 创建axios实例
 */
const ENV = process.env.NODE_ENV
const host = ENV === 'development'?'http://127.0.0.1:3000':''
const service = axios.create({
    baseURL: host,
    //请求时间超过3s 报错
    timeout: '3000',
})

/**
 * 请求拦截
 */
service.interceptors.request.use((config) => {
    console.log(config);
    //检查config发起请求的url中是否包含login的路径
    if (config.url.indexOf('login') < 0) {
        //登录接口请求时 存入token值到localStorage，当发起请求时 token被存入authorization中
        config.headers.authorization = localStorage.getItem('token');
    }
    return config;
});

/**
 * 响应拦截
 */
service.interceptors.response.use((res) => {
     const {code, data, message} = res

    if (res.data.code === 0) {
        return res.data
    }else {
        ElMessage({
            message: 'Failed',
            type: 'warning'
        });
    }

    if (message === 'Authorization failed') {
        router.push('/login')
    }
});

/**
 * 封装请求函数
 */
const request = (options) => {
    if (options.method === 'get') {
        options.params = options.data
    };
    return service (options);
}

export default request;