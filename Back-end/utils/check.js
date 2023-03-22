const joi = require('joi');

//用户注册登录的表单校验规则
const userName = joi
  .string()
//   .pattern(/^[\S]{1,6}$/)
  .required();
const password = joi
  .string()
//   .pattern(/^[\S]{6,12}$/)
  .required();

exports.userCheck = {
  body: {
    userName,
    password,
  },
};