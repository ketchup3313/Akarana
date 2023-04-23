const { query , insert } = require('../db')
let handerObj = {
  queryList(req, res){
    const sql = `SELECT * FROM rally`
    try {
        query(sql, null, (result) => {
            res.send({
                status: 1,
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

  queryInfo(req, res) {
    const sql = `SELECT * FROM rally WHERE id=${req.query.id}`
    try {
      query(sql, req.id, (result) => {
        res.send({
          status: 0,
          data:  result[0],
          msg: 'query success !',
        })
      })
    } catch (error) {
       res.send({
        status: 1,
        msg: error.code,
      })
    }
  },
  // 插入语句 查询语句
  // 传参 rallyid
  //      userid
  requestJoin(req, res){
    const sql = `SELECT * FROM participate WHERE rallyid=${req.body.rallyid} and userid=${req.body.userid}`
    try {
      query(sql, null, (result) => {
        if (result.length !== 1) {
            // console.log('进行插入语句');
            insert('participate',req.body,(result)=>{
              res.send({
                ...result,
                msg:'Congratulations on your successful participation in the event!'
              })
            })
        }else{
          res.send({
            status: 1,
            msg: 'You have already participated in this event!',
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
