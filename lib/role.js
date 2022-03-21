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
  addRole() {
    // TODO: write function
  }

  viewAllRoles() {
    // TODO: write function
  }
}

module.exports = Role;
