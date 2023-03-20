const db = require('../config/database');



exports.loginController = (req, res) => {
    let { userName, password } = req.body;
  
    const userSelectSql = 'select * from user where name=?';
    db.query(userSelectSql, userName, (err, results) => {
      //错误日志返回
      if (err) {
        return res.send({ code: 1, message: err.message });
      }
  
      //账号存在与否判断
      if (results.length === 0) {
        return res.send({ code: 1, message: '账号不存在，请先注册！' });
      }
  
      //判断密码是否正确
      const compareState = bcrypt.compareSync(password, results[0].pwd);
      if (!compareState) {
        return res.send({ code: 1, message: '密码错误！' });
      }
  
      //声明需要拼接token的用户信息
      const user = { ...results[0], pwd: '' };
  
      //生成token
      const token = jwt.sign(user, jwtSecretKey, { expiresIn: '5s' });
  
      //响应数据
      res.send({ code: 0, message: '登录成功', token: 'bearer ' + token });
    });
  };

