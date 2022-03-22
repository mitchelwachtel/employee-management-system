const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const Department = require("../lib/Department");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "system_db",
});

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

function decisionProcessing(response) {
  if (response.continue === "Add Employee") {
    addEmployee();
  } else if (response.continue === "Update Employee Role") {
    updateEmployeeRole();
  } else if (response.continue === "View All Roles") {
    viewAllRoles();
  } else if (response.continue === "Add Role") {
    addRole();
  } else if (response.continue === "View All Departments") {
    viewAllDepartments();
  } else if (response.continue === "Add Department") {
    addDepartment();
  } else if (response.continue === "View All Employees") {
    viewAllEmployees();
  } else if (response.continue === "Quit") {
    return;
  }
}

//
// DEPARTMENT FUNCTIONS
//
function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result);
    }
  });
  inquirer.prompt([repeatedQuestion]).then((response) => {
    decisionProcessing(response);
  });
}
function addDepartment() {
  // TODO: write function
  console.log("hey!");
}

module.exports = {addDepartment, viewAllDepartments};
