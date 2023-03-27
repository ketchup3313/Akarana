const jwt = require('jsonwebtoken')
const {query} = require('../db')
const config = require('../config')

module.exports = (req, res) => {
  const sql = 'SELECT * FROM member WHERE username=?'
  query(sql, req.body.username, (result) => {
    if (result.length !== 1) {
      return res.send({
        status: 1,
        msg: '该用户不存在',
      })
    }
  
    const passRes = req.body.password === result[0].password ? true : false;
    if (!passRes) {
      return res.send({
        status: 1,
        msg: '密码错误',
      })
    }
    const token = jwt.sign({ username: req.body.username }, config.jwtKey, {
      expiresIn: '1h',
    })
    res.send({
      status: 0,
      msg: '登陆成功',
      token,
      userInfo:result[0]
    })
  })
}
