const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const db = require("../config/connection");
const {insertEmp, getManagerId} = require("../helpers/empFuns");
const {getRoleId} = require("../helpers/roleFuns");

// EDIT AS NEEDED
class Employee {
  constructor(first_name, last_name, role, manager) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role = role;
    this.managerFirstName = manager.split(" ")[0];
    this.managerLastName = manager.split(" ")[1];
    this.manager = manager;
  }

  // empQuery() {
  //   getRoleId(this.role).then((rId) => { if ()
  //     getManagerId(this.managerFirstName, this.managerLastName).then((mId) => {
  //       insertEmp(this.first_name, this.last_name, rId, mId);
  //     });
  //   });
  // }
}

module.exports = Employee;
