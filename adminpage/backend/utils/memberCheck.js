/**
 * member 表单验证规则
 */
const joi = require('joi');
//验证member name, phone number, username, password是否包含空格，是否包含特殊字符\

//定义first name只能是字母字符串或数字字符串
const firstName = joi.string().required();
//定义first name只能是字母字符串或数字字符串
const lastName = joi.string().required();
//定义只能是数字
const phoneNumber = joi.string().required();
//定义只能是字母字符串或数字字符
const username = joi.string().required();
//定义只能是字母字符串或数字字符
const password = joi.string().required();
//定义只能是字母字符串或数字字符
const address = joi.string();
//定义只能是字符串
const emailAddress = joi.string();
//定义只能是字符串
const birthday = joi.string();
//定义只能是字符串
const occupation = joi.string();
exports.memberCheck = {
    body:{
        firstName,
        lastName,
        phoneNumber,
        username,
        password,
        address,
        emailAddress,
        birthday,
        occupation
    }
}