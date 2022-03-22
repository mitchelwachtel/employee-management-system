const inquirer = require("inquirer");
const cTable = require("console.table");
const Role = require("../lib/Role");
const db = require("../config/connection");

module.exports = {addRole, viewAllRoles};
