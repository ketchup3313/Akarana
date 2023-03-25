const mysql = require('mysql')

const db = mysql.createPool({
  host: '8.219.194.127',
  user: 'root',
  password: 'akarana',
  database: 'akarana_admin',
})

module.exports = {
  query: (sql, arr, callback) => {
    db.query(sql, arr, function (error, res) {
      if (error) {
        return console.log(error)
      }
      callback(res)
    })
  },
  update: (tableName, updateData, callback) => {
    let handerId = updateData.id;
    console.log(handerId);
    delete updateData.id
    let UpdateData = Object.entries(updateData);
    UpdateData = UpdateData.map((item, index) => {
      let one = `${item[0]} = ?${index === UpdateData.length - 1 ? '' : ','}`
      return [one, item[1]];
    })

    let props = UpdateData.map(item => item[0]).reduce((cur, next) => cur + next, '')
    console.log(props);
    let data = UpdateData.map(item => item[1])
    console.log(data);
    let sql = `UPDATE ${tableName} SET ${props} WHERE id = ${handerId}`;
    db.query(sql, data, function (error, res) {
      console.log(res);
      if (error) {
        console.log(error);
        callback({
          status: 1,
          msg: error.code ? error.code : 'error',
        })
        return;
      };
      callback({
        status: 0,
        msg: res.message,
      })
    })
  },
}
