const inquirer = require("inquirer");
const cTable = require("console.table");
const Department = require("../lib/Department");
const db = require("../config/connection");

async function selectDept() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [rows, fields] = await db.execute("SELECT * FROM department");
  console.log("\n");
  console.table(rows);
  console.log("\n\n\n\n\n\n\n");
}

async function getDeptArr() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [deptArr, fields] = await db.execute(
    "SELECT id, title FROM department"
  );
  return deptArr;
}

async function insertDept(response) {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [deptArr, fields] = await db.execute(
    `INSERT INTO department(name) VALUES('${response.dept}')`
  );
  console.log(`${response.dept} was added`);
  return deptArr;
}

module.exports = {selectDept, getDeptArr, insertDept};
