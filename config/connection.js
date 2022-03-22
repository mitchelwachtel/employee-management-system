const mysql = require("mysql2/promise");


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "system_db",
});

module.exports = db;