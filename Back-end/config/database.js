const mysql = require("mysql");

const connection = mysql.createPool({
  host: "8.219.194.127",
  user: "root",
  password: "akarana",
  database: "akarana",
});


module.exports = connection;