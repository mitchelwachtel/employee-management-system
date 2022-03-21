const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "system_db",
});

class Employee {
  constructor() {}
  addEmployee() {
    // TODO: write function
  }
  updateEmployeeRole() {
    // TODO: write function
  }
  viewAllEmployees() {
    // TODO: write function
  }
}

module.exports = Employee;
