const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const {start} = require("./mainPrompt");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "system_db",
});

// EDIT AS NEEDED
class Role {
  constructor(name, id, email){
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getName() {
    return this.name;
  }
  getId() {
      return this.id;
  }
  getEmail() {
      return this.email;
  }
  getRole() {
      return 'Employee';
  }
}

module.exports = Role;
