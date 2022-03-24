const inquirer = require("inquirer");
const cTable = require("console.table");


const {
  selectEmp,
  getEmpArr,
  empQuery,
  getManagerId,
  updateEmpRole,
  updateEmpManager,
  deleteEmp,
} = require("../helpers/empFuns");
const {
  selectRole,
  getRolesArr,
  insertRole,
  deleteRole,
} = require("../helpers/roleFuns");
const {
  selectDept,
  getDeptArr,
  insertDept,
  deleteDept,
  getDeptId,
} = require("../helpers/deptFuns");

const repeatedQuestion = {
  type: "list",
  message: "What would you like to do?",
  name: "continue",
  choices: [
    "View All Employees",
    "View All Roles",
    "View All Departments",
    "View Employee By Manager",
    "View Employee By Department",
    "View Utilized Department Budget",
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
      this.viewAllRoles();
    } else if (response.continue === "Add Role") {
      this.addRole();
    } else if (response.continue === "View All Departments") {
      this.viewAllDepartments();
    } else if (response.continue === "Add Department") {
      this.addDepartment();
    } else if (response.continue === "View All Employees") {
      this.viewAllEmployees();
    } else if (response.continue === "Delete Employee") {
      this.deleteEmployee();
    } else if (response.continue === "Delete Role") {
      this.deleteRole();
    } else if (response.continue === "Delete Department") {
      this.deleteDepartment();
    } else if (response.continue === "View Employee By Department") {
      this.viewEmployeeByDepartment();
    } else if (response.continue === "View Employee By Manager") {
      this.viewEmployeeByManager();
    } else if (response.continue === "View Utilized Department Budget") {
      this.viewDepartmentBudget();
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
  async viewAllEmployees() {
    const mysql = require("mysql2/promise");

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootroot",
      database: "system_db",
    });

    const [rows, fields] = await db.execute("SELECT * FROM employee");
    console.log("\n");
    console.table(rows);
    console.log("\n");
    if (rows.length) {
      this.start();
    }
  }

  async viewEmployeeByDepartment() {
    const mysql = require("mysql2/promise");

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootroot",
      database: "system_db",
    });

    const deptArr = [];
    getDeptArr().then((result) => {
      result.forEach((row) => deptArr.push(row["name"]));

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which department's employees would you like to view?",
            name: "dept",
            choices: deptArr,
          },
        ])
        .then((response) => {
          getDeptId(response.dept).then(async (dId) => {
            const [rows, fields] = await db.execute(
              `SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id FROM employee e JOIN role r ON e.role_id = r.id WHERE department_id = '${dId}'`
            );
            console.log("\n");
            console.table(rows);
            if (rows.length) {
              this.start();
            } else {
              console.log("This department contains no employees.");
              this.start();
            }
          });
        });
    });
  }
  async viewEmployeeByManager() {
    const mysql = require("mysql2/promise");

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootroot",
      database: "system_db",
    });

    const managersArr = ["No Manager"];
    getEmpArr().then((result) => {
      result.forEach((row) =>
        managersArr.push(`${row["first_name"]} ${row["last_name"]}`)
      );

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which department's employees would you like to view?",
            name: "manager",
            choices: managersArr,
          },
        ])
        .then(async (response) => {
          if (response.manager.split(" ")[0] === "No") {
            const [rows, fields] = await db.execute(
              `SELECT * FROM employee WHERE manager_id = null`
            );
            console.log("\n");
            console.table(rows);
            if (rows.length) {
              this.start();
            } else {
              console.log("There are 0 employees with no manager");
              this.start();
            }
          } else {
            getManagerId(
              response.manager.split(" ")[0],
              response.manager.split(" ")[0]
            ).then(async (mId) => {
              const [rows, fields] = await db.execute(
                `SELECT * FROM employee WHERE manager_id = '${mId}'`
              );
              console.log("\n");
              console.table(rows);
              if (rows.length) {
                this.start();
              } else {
                console.log(
                  `There are no employees with ${response.manager} as their manager.`
                );
                this.start();
              }
            });
          }
        });
    });
  }

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
  async viewAllRoles() {
    const mysql = require("mysql2/promise");

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootroot",
      database: "system_db",
    });

    const [rows, fields] = await db.execute("SELECT * FROM role");
    console.log("\n");
    console.table(rows);
    console.log("\n");
    if (rows.length) {
      this.start();
    }
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

  deleteRole() {
    const rolesArr = [];
    getRolesArr().then((result) => {
      result.forEach((row) => rolesArr.push(row["title"]));

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which role would you like to delete from the system?",
            name: "role",
            choices: rolesArr,
          },
        ])
        .then((response) => {
          deleteRole(response).then(this.start());
        });
    });
  }

  //
  // DEPARTMENT FUNCTIONS
  //
  async viewAllDepartments() {
    const mysql = require("mysql2/promise");

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootroot",
      database: "system_db",
    });

    const [rows, fields] = await db.execute("SELECT * FROM department");
    console.log("\n");
    console.table(rows);
    console.log("\n");
    if (rows.length) {
      this.start();
    }
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
  deleteDepartment() {
    const deptArr = [];
    getDeptArr().then((result) => {
      result.forEach((row) => deptArr.push(row["name"]));

      inquirer
        .prompt([
          {
            type: "list",
            message:
              "Which department would you like to delete from the system?",
            name: "dept",
            choices: deptArr,
          },
        ])
        .then((response) => {
          deleteDept(response).then(this.start());
        });
    });
  }

  async viewDepartmentBudget() {
    const mysql = require("mysql2/promise");

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootroot",
      database: "system_db",
    });

    const deptArr = [];
    getDeptArr().then((result) => {
      result.forEach((row) => deptArr.push(row["name"]));

      inquirer
        .prompt([
          {
            type: "list",
            message:
              "Which department's utilized budget would you like to view?",
            name: "dept",
            choices: deptArr,
          },
        ])
        .then((response) => {
          getDeptId(response.dept).then(async (dId) => {
            const [rows, fields] = await db.execute(
              `SELECT SUM(r.salary) as ${response.dept}_salary FROM employee e JOIN role r ON e.role_id = r.id WHERE department_id = '${dId}'`
            );
            console.log("\n");
            console.table(rows);
            if (rows.length) {
              this.start();
            } else {
              console.log(
                `No salary is set aside for the ${response.dept} department`
              );
              this.start();
            }
          });
        });
    });
  }
}

module.exports = Prompt;
