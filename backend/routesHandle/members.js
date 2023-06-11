const { query  } = require('../db')
let handerObj = {
  queryCouples(req, res) {
    const { couples } = req.query;
    const sql = `SELECT * FROM member WHERE couples = ?`;
    try {
      query(sql, [couples], (result) => {
        res.send({
          status: 0,
          data: result,
          msg: 'success',
        })
      })    
    } catch (error) {
      res.send({
        status: 1,
        data: [],
        msg: error.code,
      })
    }
  },
  queryList(req, res){
    const sql = `SELECT * FROM member`
    try {
        query(sql, null, (result) => {
            res.send({
                status: 0,
                data: result,
                msg: 'success',
              })
        })    
    } catch (error) {
        res.send({
            status: 1,
            data: [],
            msg: error.code,
          })
    }
    
  },

  queryUsername(req, res) {
    const { username } = req.query;
    const sql = `SELECT * FROM member WHERE username = ?`;
    try {
      query(sql, [username], (result) => {
        if (result.length > 0) {
          // If the result set is not empty, the username is already in use
          res.send({
            status: 0,
            msg: 'Username exists',
          })
        } else {
          // If the result set is empty, the username is available
          res.send({
            status: 1,
            msg: 'Username available',
          })
        }
      })    
    } catch (error) {
      res.send({
        status: 1,
        msg: error.code,
      })
    }
  },
    

}
module.exports = handerObj