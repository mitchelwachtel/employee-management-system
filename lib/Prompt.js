const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const db = require("../config/connection");
const {
  selectEmp,
  getEmpArr,
  empQuery,
  updateEmpRole,
} = require("../helpers/empFuns");
const {selectRole, getRolesArr, insertRole} = require("../helpers/roleFuns");
const {selectDept, getDeptArr, insertDept} = require("../helpers/deptFuns");

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
      selectRole().then(this.start());
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
      ])
      .then((response) => {
        empQuery(response).then(this.start());
      });
  }
  updateEmployeeRole() {
    const empArr = [];
    const rolesArr = [];
    getEmpArr().then((result) => {
      result.forEach((row) => {
        empArr.push(`${row["first_name"]} ${row["last_name"]}`);
      });
      getRolesArr().then((result) => {
        result.forEach((row) => rolesArr.push(row["title"]));

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which employee's role would you like to update?",
              name: "emp",
              choices: empArr,
            },
            {
              type: "list",
              message: "Which role do you want to assign?",
              name: "role",
              choices: rolesArr,
            },
          ])
          .then((response) => {
            updateEmpRole(response).then(this.start());
          })
      });
    });
  }

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
    const deptArr = [];
    getDeptArr().then((result) => {
      result.forEach((row) => deptArr.push(row["name"]));

      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the name of the role you would like to add?",
            name: "name",
          },
          {
            type: "input",
            message: "What is the salary for this new role?",
            name: "salary",
          },
          {
            type: "list",
            message: "Which role do you want to assign?",
            name: "dept",
            choices: deptArr,
          },
        ])
        .then((response) => {
          insertRole(response).then(this.start());
        });
    });
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
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department you would like to add?",
          name: "dept",
        },
      ])
      .then((response) => {
        insertDept(response).then(this.start());
      });
  }
}

module.exports = Prompt;
