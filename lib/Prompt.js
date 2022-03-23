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
    const rolesIdArr = [];
    const managersArr = ["No Manager"];
    const managersIdArr = [["No Manager", null]];

    db.query("SELECT id, title FROM role", (err, result) => {
      if (err) {
        console.log(err);
      }
      // iterating through the result by the keys. Placing the role titles in an array for the questioning. Placing the title and the pairing role_id in another array to be used in a few lines
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        rolesArr.push(row.title);
        rolesIdArr.push([row.title, row.id]);
      });
    });

    //   A very similar thing as with role, but with manager
    db.query(
      "SELECT id, first_name, last_name FROM employee",
      (err, result) => {
        if (err) {
          console.log(err);
        }
        Object.keys(result).forEach(function (key) {
          let row = result[key];
          let name = `${row.first_name} ${row.last_name}`;
          managersArr.push(name);
          managersIdArr.push([name, row.id]);
        });
      }
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
