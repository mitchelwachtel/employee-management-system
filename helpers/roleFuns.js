const inquirer = require("inquirer");
const cTable = require("console.table");
const Role = require("../lib/Role");
const db = require("../config/connection");

async function selectRole() {
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
  console.log("\n\n\n\n\n\n\n");
}

async function getRolesArr() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [rolesArr, fields] = await db.execute("SELECT id, title FROM role");
  return rolesArr;
}

async function getRoleId(role) {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [id, fields] = await db.execute(
    `SELECT id FROM role WHERE title = '${role}'`
  );
  return id[0]["id"];
}

module.exports = {selectRole, getRolesArr, getRoleId};
