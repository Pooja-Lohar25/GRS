const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()


const myhost= process.env.HOST
const mysqlUser = process.env.USER
const pass = process.env.PASSWORD
const dbname = process.env.DATABASE


var con = mysql.createConnection({
  host: myhost, // "localhost",
  user: mysqlUser, //"root",
  password: pass, //'root',
  database: dbname, //'db'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("db Connected!");
});

console.log(mysqlUser,myhost,dbname,pass)