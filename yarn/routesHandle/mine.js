const {update,query} = require('../db')
let handerObj = {
    updateUserInfo(req, res){
        update('member', req.body, (result) => {
          return res.send(result)
        })
      },
    queryUserInfo(req, res){
      // console.log(req.query.id);
      // const sql = 'SELECT * FROM member WHERE id=?'
      // query(sql,req.id)
    },

    
}
module.exports = handerObj
