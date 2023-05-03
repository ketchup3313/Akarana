/**
 * admin login check
 */
const joi = require('joi');
//验证admin login page是否正确

const admin = joi.string().required();
const password = joi.string().required();

exports.adminCheck = {
    body:{
        admin,
        password
    }
};