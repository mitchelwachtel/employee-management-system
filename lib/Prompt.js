const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const db = require("../config/connection");
const {
  selectEmp,
  getEmpArr,
  empQuery,
  updateEmpRole,
  updateEmpManager,
  deleteEmp,
} = require("../helpers/empFuns");
const {selectRole, getRolesArr, insertRole} = require("../helpers/roleFuns");
const {selectDept, getDeptArr, insertDept} = require("../helpers/deptFuns");

const repeatedQuestion = {
  type: "list",
  message: "What would you like to do?",
  name: "continue",
  choices: [
    "View All Employees",
    "View All Roles",
    "View All Departments",
    "Add Employee",
    "Add Role",
    "Add Department",
    "Update Employee Role",
    "Update Employee Manager",
    "Delete Employee",
    "Delete Role",
    "Delete Department",
    "Quit",
  ],
};

class Prompt {
  decisionProcessing(response) {
    if (response.continue === "Add Employee") {
      this.addEmployee();
    } else if (response.continue === "Update Employee Role") {
      this.updateEmployeeRole();
    } else if (response.continue === "Update Employee Manager") {
      this.updateEmployeeManager();
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
    } else if (response.continue === "Delete Employee") {
      this.deleteEmployee();
    } else if (response.continue === "Delete Role") {
      this.deleteRole();
    } else if (response.continue === "Delete Department") {
      this.deleteDepartment();
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
          });
      });
    });
  }
  updateEmployeeManager() {
    const empArr = [];
    const managerArr = ["No Manager"];
    getEmpArr().then((result) => {
      result.forEach((row) => {
        empArr.push(`${row["first_name"]} ${row["last_name"]}`);
        managerArr.push(`${row["first_name"]} ${row["last_name"]}`);
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee's manager would you like to update?",
            name: "emp",
            choices: empArr,
          },
          {
            type: "list",
            message: "Who will be this employee's manager?",
            name: "manager",
            choices: managerArr,
          },
        ])
        .then((response) => {
          updateEmpManager(response).then(this.start());
        });
    });
  }

  deleteEmployee() {
    const empArr = [];
    getEmpArr().then((result) => {
      result.forEach((row) => {
        empArr.push(`${row["first_name"]} ${row["last_name"]}`);
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee would you like to delete from the system?",
            name: "emp",
            choices: empArr,
          },
        ])
        .then((response) => {
          deleteEmp(response).then(this.start());
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

//   deleteRole() {
//     const empArr = [];
//     getEmpArr().then((result) => {
//       result.forEach((row) => {
//         empArr.push(`${row["first_name"]} ${row["last_name"]}`);
//       });

//       inquirer
//         .prompt([
//           {
//             type: "list",
//             message: "Which employee would you like to delete from the system?",
//             name: "emp",
//             choices: empArr,
//           },
//         ])
//         .then((response) => {
//           deleteEmp(response).then(this.start());
//         });
//     });
//   }



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
