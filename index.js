// const {start} = require("./lib/mainPrompt");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
const Role = require("./lib/Role");

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

function start() {
  inquirer.prompt([repeatedQuestion]).then((response) => {
    decisionProcessing(response);
  });
}

//
//  EMPLOYEE FUNCTIONS
//
function addEmployee() {
  const rolesArr = [];
  const rolesIdArr = [];
  const managersArr = ["Greg", "Amanda", "Jennifer"];

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
      let roleId;
      //   Here is my "genius" way of getting the role_id from that single query above. As it iterates through the rolesId array, we are waiting until the selected title is matched and then it's id is grabbed to be sent to make an object!
      for (let i = 0; i < rolesIdArr.length; i++) {
        if (rolesIdArr[i][0] === response.role) {
          roleId = rolesIdArr[i][1];
        }
      }

      const emp = new Employee(
        response.first_name,
        response.last_name,
        response.role,
        response.manager,
        roleId
      );
      emp.insertEmp();
      decisionProcessing(response);
    });
}
function updateEmployeeRole() {
  // TODO: write function
  console.log("hey!");
}
function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result);
    }
  });
}

//
// ROLE FUNCTIONS
//
function viewAllRoles() {
  // TODO: write function
  console.log("hey!");
}
function addRole() {
  // TODO: write function
  console.log("hey!");
}

//
// DEPARTMENT FUNCTIONS
//
function viewAllDepartments() {
  // TODO: write function
  console.log("hey!");
}
function addDepartment() {
  // TODO: write function
  console.log("hey!");
}

start();
