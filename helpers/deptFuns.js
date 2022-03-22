const inquirer = require("inquirer");
const cTable = require("console.table");
const Department = require("../lib/Department");
const db = require("../config/connection");


module.exports = {addDepartment, viewAllDepartments};
