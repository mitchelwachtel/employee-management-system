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
  
    const [rows, fields] = await db.execute(
      "SELECT * FROM department"
    );
    console.log("\n")
    console.table(rows);
    console.log("\n\n\n\n\n\n\n");
  }
  
  
  module.exports = {selectDept};
