var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database:"abs",
  port :3306,
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});