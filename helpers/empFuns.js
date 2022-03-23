const inquirer = require("inquirer");
const cTable = require("console.table");

async function selectEmp() {
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
  console.log("\n")
  console.table(rows);
  console.log("\n\n\n\n\n\n\n");
}



module.exports = {selectEmp};
