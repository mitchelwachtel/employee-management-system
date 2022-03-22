const cTable = require("console.table");
// const db = require("./config/connection");

// db.query(`SELECT id FROM employee WHERE first_name = 'Susie'`, function (err, result) {

//   console.log(result[0]['id']);

// });

async function main() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [rows, fields] = await db.execute(
    "SELECT * FROM employee"
  );

  console.table(rows);
}

main();
