/**
 * admin page, member information register
 */
//连接远程服务器
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const OSS = require('ali-oss');
const fs = require('fs');
const { jwtSecretKey } = require('../config/jwtSecretKey');
//创建阿里云OSS对象
const ossClient = new OSS({
    region: 'oss-ap-southeast-1',
    accessKeyId: 'LTAI5tR2CSMZbgyNBhrgcKn5',
    accessKeySecret: 'iTa4d64JFXJBt5A4eGJ6OldmTeQQrl',
    bucket: 'akarana',
})
//member info register
exports.registerControllers = (req, res) =>{
    //定义和响应前端请求的member info的参数
    let {firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation} = req.body;
    
    //member name, phone number, username, password 判断是否为空的校验
    if (!firstName || !lastName || !phoneNumber || !username || !password) {
        return res.send({code: 1, message:'Member name, phone number, username and password could not be empty.'});
    };

    //登录用的username could no be repeated
    const usernameSelectSql = 'SELECT * FROM member WHERE username =?';
    db.query(usernameSelectSql, username, (err, results) =>{
        if (err) {
            return res.send({code: 1, message:err.message})
        };

        //如果打印的数组值为0，空值，则return一个error message
        if (results.length > 0) {
            return res.send({code: 1, message:' The member user name has already exists.'});
        };

        //member info insert into database
        const memberInsertSql = 'INSERT INTO member (firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(memberInsertSql, [firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation], (err, results) =>{
                if (err) {
                    return res.send({code: 1, message: err.message});
                };
                res.send({code: 0, message:'Member Information Register Success!'});
            }
        )
    });
};

//admin login
exports.loginControllers = (req, res) =>{
    let{ admin, password } = req.body;
    //sql语句 查询admin字段
    const adminSelectSql = 'SELECT admin FROM admin WHERE admin =?';
    //sql语句 查询password字段
    const passwordSelectSql = 'SELECT password FROM admin WHERE password =?';

    //先查询admin，再查询password
    db.query(adminSelectSql, admin, (err, results) =>{
        //错误日志返回
        if (err) {
            return res.send({code: 1, message:err.message});
        };

        //验证admin字段是否和数据库一致，使用 === 绝对等
        if (results.length === 0) {
            return res.send({code: 1, message:'Administer account name is not correct!'});
        };

        //验证password字段是否和数据库一致，使用 === 绝对等
        db.query(passwordSelectSql, password, (err, results) =>{
            if (err) {
                return res.send({code: 1, message:err.message})
            };
    
            if (results.length === 0) {
                return res.send({code: 1, message:'Password is not correct!'});
            };
            
            //设置admin网站过期时间，目前为24h
            const admin = {admin:'admin'};
            const token = jwt.sign(admin, jwtSecretKey,{expiresIn: '24h'});
            
            //登录成功
            res.send({code: 0, message: 'Login Success', token: 'Bearer ' + token});
        });
    })
};

//admin page: search member info
exports.adminInfoControllers = (req, res) =>{
    //获取token
    const token = req.headers.authorization;
    const adminInfo = jwt.verify(token.split('Bearer ')[1], jwtSecretKey);
    res.send({code: 0, data: {admin: adminInfo.admin}});
};

//admin page: upload single photo api
exports.uploadImagesControllers = async (req, res) =>{
    //读取图片路径，转换为二进制流
    const fileContent = fs.readFileSync(req.file.path);
    try {
        //调用阿里云OSS对象，本地图片上传到阿里云OSS存储，并获取它的url
        const ossResult = await ossClient.put(req.file.originalname, fileContent)
        const imageUrl = ossResult.url;

        //sql语句，将HTTPS格式的图片URL存储到mysql数据库中
        const uploadSql = 'INSERT INTO image (url) VALUES (?)';
        db.query(uploadSql, imageUrl, (err, results) =>{
            if (err) {
                return res.send({code: 1, message: err.message});
            }
            res.send({code: 0, message:'Upload Success!'});
        })
    } catch (err) {
        console.error(err);
        return res.send({code: 1, message: 'Failed to upload'});
    }
};

//admin page: display photo api
exports.displayImageControllers = (req, res) =>{
    let id = req.query;
    //sql语句 选出 id和对应图片的二进制流path
    const displayImageSql = 'SELECT id, url FROM image ORDER BY id';

    //执行sql语句，传入id值
    db.query(displayImageSql, [id], (err, SqlResults) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, data:{list: SqlResults}})
    })
};

//admin page: delete photo api
exports.deleteImageByIDControllers = (req, res) =>{
    let {id} = req.query;
    let sql = 'DELETE FROM image WHERE id=?';

    db.query(sql, id, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message:'Delete Photo Success!'});
    });
};

//同时上传文字和图片的接口
exports.createRallyControllers = async(req, res) =>{
    let {mainTitle, subTitle, content, time, address, mapUrl} = req.body

    //读取图片路径，转换为二进制流
    const fileContent = fs.readFileSync(req.file.path);
    try {
        //调用阿里云OSS对象，本地图片上传到阿里云OSS存储，并获取它的url
        const ossResult = await ossClient.put(req.file.originalname, fileContent)
        const imageUrl = ossResult.url;

        //当创建一个rally时，使用 DEFAULT 关键字来设置status这个列的默认值
        const setUpStatusSql = 'ALTER TABLE rally MODIFY status VARCHAR(50) DEFAULT "open"';
        db.query(setUpStatusSql, (err, results) =>{
            if (err) {
                return res.send({code: 1, message:err.message})
            }
            //创建rally，传入关键字mainTitle, subTitle, content, time, address, image
            const createRallySql = 'INSERT INTO rally (mainTitle, subTitle, content, time, address, image, mapUrl) VALUE(?, ?, ?, ?, ?, ?, ?)'
            db.query(createRallySql, [mainTitle, subTitle, content, time, address, imageUrl, mapUrl], (err, results) =>{
                if (err) {
                    return res.send({code: 1, message: err.message});
                };
                res.send({code: 0, message:'Rally Create Success!'});
            })
        })
    } catch (err) {
        console.error(err);
        return res.send({code: 1, message: 'Failed to upload'});
    }
}