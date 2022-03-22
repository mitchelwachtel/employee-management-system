const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("../config/connection");

// EDIT AS NEEDED
class Department {
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

module.exports = Department;
