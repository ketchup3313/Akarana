const jwt = require('jsonwebtoken')
const {query} = require('../db')
const config = require('../config')

module.exports = (req, res) => {
  console.log("1");
  const sql = 'SELECT * FROM member WHERE username=?'
  query(sql, req.body.username, (result) => {
    console.log("2");
    if (result.length !== 1) {
      console.log("3");
      return res.send({
        status: 1,
        msg: 'Username error,Can\'t login? Please contact mentortoc@gmail.com',
      })
    }
    console.log("4");
    const passRes = req.body.password === result[0].password ? true : false;
    if (!passRes) {
      console.log("5");
      return res.send({
        status: 1,
        msg: 'Password error,Can\'t login? Please contact mentortoc@gmail.com ',
      })
    }
    console.log("6");
    const token = jwt.sign({ username: req.body.username }, config.jwtKey, {
      
      expiresIn: '1h',
    })
    console.log("7");
    res.send({
      status: 0,
      msg: 'login success',
      token,
      userInfo:result[0]
    })
    console.log("8");
  })
  console.log("9");
}
