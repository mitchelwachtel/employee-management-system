const inquirer = require("inquirer");

function start() {
  inquirer
    .prompt([
      {
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
      },
    ])
    .then((response) => {
      if (response.continue === "Add Employee") {
        employee.addEmployee();
      } else if (response.continue === "Update Employee Role") {
        employee.updateEmployeeRole();
      } else if (response.continue === "View All Roles") {
        role.viewAllRoles();
      } else if (response.continue === "Add Role") {
        role.addRole();
      } else if (response.continue === "View All Departments") {
        department.viewAllDepartments();
      } else if (response.continue === "Add Department") {
        department.addDepartment();
      } else if (response.continue === "View All Employees") {
        employee.viewAllEmployees();
      } else if (response.continue === "Quit") {
        return;
      }
    });
}

module.exports = start();
