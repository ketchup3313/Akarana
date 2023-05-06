//Member information 的查询校验规则
const joi = require('joi');

//member info 修改的check, 每一个表中的column name 都要进行check
const id = joi.number().integer();
//定义first name只能是字母字符串或数字字符串
const firstName = joi.string().alphanum();
//定义first name只能是字母字符串或数字字符串
const lastName = joi.string().alphanum();
//定义只能是数字
const phoneNumber = joi.string();
//定义只能是字母字符串或数字字符
const username = joi.string().alphanum();
//定义只能是字母字符串或数字字符
const password = joi.string().alphanum();
//定义只能是字母字符串或数字字符
const address = joi.string();
//定义只能是字符串
const emailAddress = joi.string();
//定义只能是字符串
const birthday = joi.string();
//定义只能是字符串
const occupation = joi.string();
//update member info
exports.updateMemberInfoCheck = {
    body:{
        id,
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
//search member info by id
exports.findMemberInfoCheck = {
    query:{
        id
    }
}

//delete member info的check，id 前面已有声明，不用重复
exports.deleteMemberInfoCheck = {
    body:{
        id
    }
}