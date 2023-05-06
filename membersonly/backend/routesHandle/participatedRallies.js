const { query } = require('../db');

const getUserParticipatedRallies = (req, res) => {
  const userId = req.query.userid;
  const sql = `
    SELECT r.* FROM rally r
    JOIN participate p ON p.rallyid = r.id
    WHERE p.userid = ${userId}
  `;
  try {
    query(sql, null, (result) => {
      res.send({
        status: 0,
        data: result,
        msg: 'success',
      });
    });
  } catch (error) {
    res.send({
      status: 1,
      data: [],
      msg: error.code,
    });
  }
};

module.exports = {
  getUserParticipatedRallies,
};
