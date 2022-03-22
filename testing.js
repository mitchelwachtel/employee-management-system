const cTable = require("console.table");
const db = require("./config/connection");

db.query(`SELECT id FROM employee WHERE first_name = 'Susie'`, function (err, result) {
  
  console.log(result[0]['id']);
  
});
