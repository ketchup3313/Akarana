const mysql = require('mysql');
//setup database information
const db = mysql.createPool({
    host:'8.219.194.127',
    user:'root',
    password:'akarana',
    database:'akarana_admin'
});

module.exports = db;