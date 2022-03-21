const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "system_db",
});

class Role {
  constructor() {}
  addDepartment() {
    // TODO: write function
  }

  viewAllDepartments() {
    // TODO: write function
  }
}

module.exports = Department;
