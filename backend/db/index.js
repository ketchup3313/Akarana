const mysql = require('mysql')

const db = mysql.createPool({
  host: '8.219.194.127',
  user: 'root',
  password: 'akarana',
  database: 'akarana_admin',
})
const queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = {
  query: (sql, arr, callback) => {
    db.query(sql, arr, function (error, res) {
      if (error) {
        return console.log(error)
      }
      callback(res)
    })
  },
  queryPromise,
  insert:(tableName,insertData,callback)=>{
    const toString  = (str)=>{
      let ary = str.split(',');
        ary[0] = `'${ary[0]}'`
      return ary.join(',');
    }
     insertData = Object.entries(insertData);


      insertData = insertData.map((item, index) => {
        let one = `${item[0]}${index === insertData.length - 1 ? '' : ','}`
        let two = `${item[1]}${index === insertData.length - 1 ? '' : ','}`
        return [one, toString(two)];
      })

      
    let props = insertData.map(item => item[0]).reduce((cur, next) => cur + next, '')
    let data =insertData.map(item => item[1]).reduce((cur, next) => cur + next, '')
    let sql = `INSERT INTO ${tableName} (${props}) VALUES (${data})`
    db.query(sql,  null, function (error, res) {
      if (error) {
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