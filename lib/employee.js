const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const db = require("../config/connection");

// EDIT AS NEEDED
class Employee {
  constructor(first_name, last_name, role, manager) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role = role;
    this.managerFirstName = manager.split(" ")[0];
    this.managerLastName = manager.split(" ")[1];
    this.manager = manager;

    this.roleQuery = db.query(
      `SELECT id FROM role WHERE title = '${this.role}'`
    );
    this.roleId = this.roleQuery[0]["id"];
    this.managerId = db.query(
      `SELECT id FROM employee WHERE first_name = '${this.managerFirstName}'`,
      function (err, result) {
        return result[0]["id"];
      }
    );
  }
  // Figure out manager_id
  insertEmp() {
    db.query(
      `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${this.first_name}', '${this.last_name}', '${this.roleId}', ${this.managerId});`,
      function (err, results) {
        if (err) {
          console.error(err);
        }
      }
    );
  }
}

module.exports = Employee;
