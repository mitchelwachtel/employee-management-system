const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const Employee = require("./Employee");
const Department = require("./Department");
const Role = require("./Role");
const db = require("../config/connection");
const {selectEmp, getEmpArr} = require("../helpers/empFuns");
const {selectRole, getRolesArr} = require("../helpers/roleFuns");
const {selectDept} = require("../helpers/deptFuns");

const repeatedQuestion = {
  type: "list",
  message: "What would you like to do?",
  name: "continue",
  choices: [
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "View All Employees",
    "Quit",
  ],
};

class Prompt {
  decisionProcessing(response) {
    if (response.continue === "Add Employee") {
      this.addEmployee();
    } else if (response.continue === "Update Employee Role") {
      this.updateEmployeeRole();
    } else if (response.continue === "View All Roles") {
      selectDept().then(this.start());
    } else if (response.continue === "Add Role") {
      this.addRole();
    } else if (response.continue === "View All Departments") {
      selectDept().then(this.start());
    } else if (response.continue === "Add Department") {
      this.addDepartment();
    } else if (response.continue === "View All Employees") {
      selectEmp().then(this.start());
    } else if (response.continue === "Quit") {
      return;
    }
  }

  start() {
    inquirer.prompt([repeatedQuestion]).then((response) => {
      this.decisionProcessing(response);
    });
  }

  //
  //  EMPLOYEE FUNCTIONS
  //
  addEmployee() {
    const rolesArr = [];
    getRolesArr().then((result) =>
      result.forEach((row) => rolesArr.push(row["title"]))
    );

    const managersArr = ["No Manager"];
    getEmpArr().then((result) =>
      result.forEach((row) => {
        managersArr.push(`${row["first_name"]} ${row["last_name"]}`);
      })
    );

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "first_name",
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "last_name",
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "role",
          choices: rolesArr,
        },
        {
          type: "list",
          message: "What is the employee's manager?",
          name: "manager",
          choices: managersArr,
        },
        repeatedQuestion,
      ])
      .then((response) => {
        const emp = new Employee(
          response.first_name,
          response.last_name,
          response.role,
          response.manager
        );
        emp.insertEmp();
        this.decisionProcessing(response);
      });
  }
  updateEmployeeRole() {
    // TODO: Fix so that table is not overridden by prompt
    console.log("hey!");
  }
  //   viewAllEmployees() {
  //     db.query("SELECT * FROM employee", (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.table(result);
  //       }
  //     });
  //     inquirer.prompt([repeatedQuestion]).then((response) => {
  //       this.decisionProcessing(response);
  //     });
  // db.query("SELECT * FROM employee", (err, result) => {
  //   return new Promise((resolve) => {
  //     resolve(result);
  //   });
  // });
  //   }

  //
  // ROLE FUNCTIONS
  //
  viewAllRoles() {
    db.query("SELECT * FROM role", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.table(result);
      }
    });
    inquirer.prompt([repeatedQuestion]).then((response) => {
      this.decisionProcessing(response);
    });
  }
  addRole() {
    // TODO: write function
    console.log("hey!");
  }

  //
  // DEPARTMENT FUNCTIONS
  //
  viewAllDepartments() {
    db.query("SELECT * FROM department", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.table(result);
      }
    });
    inquirer.prompt([repeatedQuestion]).then((response) => {
      this.decisionProcessing(response);
    });
  }
  addDepartment() {
    // TODO: write function
    console.log("hey!");
  }
}

module.exports = Prompt;
