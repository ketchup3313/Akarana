const { query } = require("../db");
let handerObj = {
  queryList(req, res) {
    const sql = `SELECT * FROM image`;
    try {
      query(sql, null, (result) => {
        res.send({
          status: 0,
          data: result,
          msg: "success",
        });
      });
    } catch (error) {
      res.send({
        status: 1,
        data: [],
        msg: error.code,
      });
    }
  },
};
module.exports = handerObj;
