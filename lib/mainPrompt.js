// const inquirer = require("inquirer");
// const Employee = require("./Employee");
// const Department = require("./Department");
// const Role = require("./Role");

// const repeatedQuestion = [
//   {
//     type: "list",
//     message: "What would you like to do?",
//     name: "continue",
//     choices: [
//       "Add Employee",
//       "Update Employee Role",
//       "View All Roles",
//       "Add Role",
//       "View All Departments",
//       "Add Department",
//       "View All Employees",
//       "Quit",
//     ],
//   },
// ];

// function decisionProcessing(response) {
//   if (response.continue === "Add Employee") {
//     addEmployee();
//   } else if (response.continue === "Update Employee Role") {
//     updateEmployeeRole();
//   } else if (response.continue === "View All Roles") {
//     viewAllRoles();
//   } else if (response.continue === "Add Role") {
//     addRole();
//   } else if (response.continue === "View All Departments") {
//     viewAllDepartments();
//   } else if (response.continue === "Add Department") {
//     addDepartment();
//   } else if (response.continue === "View All Employees") {
//     viewAllEmployees();
//   } else if (response.continue === "Quit") {
//     return;
//   }
// }

// function start() {
//   inquirer.prompt(repeatedQuestion).then((response) => {
//     decisionProcessing(response);
//   });
// }

// //
// //  EMPLOYEE FUNCTIONS
// //
// function addEmployee() {
//   // TODO: write function
//   console.log("hey!");
//   inquirer.prompt(repeatedQuestion).then((response) => {
//     decisionProcessing(response);
//   });
// }
// function updateEmployeeRole() {
//   // TODO: write function
//   console.log("hey!");
// }
// function viewAllEmployees() {
//   // TODO: write function
//   console.log("hey!");
// }

// //
// // ROLE FUNCTIONS
// //
// function viewAllRoles() {
//   // TODO: write function
//   console.log("hey!");
// }
// function addRole() {
//   // TODO: write function
//   console.log("hey!");
// }

// //
// // DEPARTMENT FUNCTIONS
// //
// function viewAllDepartments() {
//   // TODO: write function
//   console.log("hey!");
// }
// function addDepartment() {
//   // TODO: write function
//   console.log("hey!");
// }

// module.exports = {start};
