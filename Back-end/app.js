const express = require('express');
const app = express();

/**
 * 解析post请求的body数据
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

/**
 * 跨域请求配置
 */
const cors = require('cors');
app.use(cors());

// /**
//  * 解析token校验是否正确、哪些接口需要token校验
//  */
// const expressJwt = require('express-jwt');
// const { jwtSecretKey } = require('./config/jwtSecretKey');
// app.use(
//   expressJwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({
//     path: ['/api/v1/user/register', '/api/v1/user/login'],
//   })
// );

/**
 * 用户相关的接口
 */
const userRouter = require('./router/user');
app.use('/api/user', userRouter);

/**
 * 错误中间件
 */
const joi = require('joi');
app.use((err, req, res, next) => {
  //joi表单的用户信息校验失败
  if (err instanceof joi.ValidationError) {
    return res.send({
      code: 1,
      message: err.message,
    });
  }
  if (err.name === 'UnauthorizedError') {
    return res.send({
      code: 1,
      message: '身份认证失败',
    });
  }
 //Set up the error object to send back to the client
let errorObject = {
    code: 1,
    message: err.message,
  };

//Send the error object back to the client
res.send
});

// Get port from environment variables, use 3000 if not set
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});