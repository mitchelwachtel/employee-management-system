const inquirer = require("inquirer");
const mainPrompt = require("./mainPrompt");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "system_db",
});

class Department {
  constructor() {}
  addDepartment() {
    // TODO: write function
    console.log('hey!')
    mainPrompt.start();
  }

  viewAllDepartments() {
    // TODO: write function
    console.log('hey!')
    mainPrompt.start();
  }
}

module.exports = Department;
