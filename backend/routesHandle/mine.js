const { update, query } = require('../db')
let handerObj = {
  updateUserInfo(req, res) {
    update('member', req.body, (result) => {
      return res.send(result)
    })
  },


  queryUserInfo(req, res) {
    const sql = `SELECT * FROM member WHERE id=${req.query.id}`
    try {
      query(sql, req.id, (result) => {
        console.log(result);
        if (result.length !== 1) {
          return res.send({
            status: 1,
            msg: 'this username is not exist',
          })
        }
        res.send({
          status: 0,
          data:  result[0],
          msg: 'query success !',
        })
      })
    } catch (error) {
      return res.send({
        status: 1,
        msg: error.code,
      })
    }
  },


}
module.exports = handerObj
