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
class Employee {
  constructor(first_name, last_name, role, manager, roleId) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role = role;
    this.manager = manager;
    this.roleId = roleId;
    this.managerId = 2;
  }
  // Figure out manager_id
  insertEmp() {
    db.query(
      `INSERT INTO employee(first_name, last_name, role_id) VALUES('${this.first_name}', '${this.last_name}', '${this.roleId}');`,
      function (err, results) {
        if (err) {
          console.error(err);
        }
      }
    );
  }
}

module.exports = Employee;
