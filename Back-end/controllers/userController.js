const db = require('../config/database');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const  {jwtSecretKey} = require('../config/jwtSecretKey');

exports.loginController = (req, res) => {
    const sql='select * from user where name=?';
    res.send('login Success')
    let { userName, password } = req.body;
  
    const userSelectSql = 'select * from user where name=?';
    db.query(userSelectSql, userName, (err, results) => {
      //错误日志返回
      if (err) {
        return res.send({ code: 1, message: err.message });
      }
  
      //账号存在与否判断
      if (results.length === 0) {
        return res.send({ code: 1, message: 'account not exist' });
      }
  
      //判断密码是否正确
      const compareState = bcrypt.compareSync(password, results[0].pwd);
      if (!compareState) {
        return res.send({ code: 1, message: 'Wrong message' });
      }
  
      //声明需要拼接token的用户信息
      const user = { ...results[0], pwd: '' };
  
      //生成token
      const token = jwt.sign(user, jwtSecretKey, { expiresIn: '24h' });
    // Jwt
      

      //响应数据J
      res.send({ code: 0, message: '登录成功', token: 'bearer ' + token });
    });
  };

