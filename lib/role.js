const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const mainPrompt = require("./mainPrompt");

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
    console.log('hey!')
    mainPrompt.start();
  }

  viewAllRoles() {
    // TODO: write function
    console.log('hey!')
    mainPrompt.start();
  }
}

module.exports = Role;
