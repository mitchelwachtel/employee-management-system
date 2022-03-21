const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "manage_db",
});

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
  .then((data) => {});
