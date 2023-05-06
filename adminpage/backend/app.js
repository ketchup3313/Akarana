const express = require('express');
const app = express();

//解析post请求的body数据
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }))

//跨域请求配置
const cors = require('cors');
app.use(cors());

/**
 * 解析token校验是否正确，哪些接口需要token校验
 */
const expressJwt = require('express-jwt');
const { jwtSecretKey } = require('./config/jwtSecretKey');
//传入需要token的接口名称
app.use(expressJwt({ secret:jwtSecretKey, algorithms: ['HS256']}).unless({path:['/api/v1/admin/register', '/api/v1/admin/login', '/api/v1/admin/upload', '/api/v1/admin/display', '/api/v1/admin/create', '/api/v1/admin/uploadCoverImage'] }))

//router的配置一定要在解析和跨域之后
/**
 * Admin page api
 */
const adminRouter = require('./router/admin');
app.use('/api/v1/admin', adminRouter);

/**
 * member info page api
 */
const memberRouter = require('./router/member');
app.use('/api/v1/member', memberRouter);

/**
 * 配置错误中间件
 */
const joi = require('joi');
app.use((err, req, res, next) =>{
    //joi表单的member info校验不通过
    if ((err instanceof joi.ValidationError)) {
        return res.send({code: 1, message: err.message});
    };
    if (err.name === 'UnauthorizedError') {
        return res.send({code:1,message:'Authorized failed'})
    }
    //其他错误
    res.send({code: 1, message:err.message});
});
//以上配置需要在调用路由之前
//启动并监听服务器 port 3000
app.listen(3000,() =>{
    console.log('server will start at: http://127.0.0.1:3000');
});