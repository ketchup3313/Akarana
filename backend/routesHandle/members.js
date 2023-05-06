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

 
    

}
module.exports = handerObj