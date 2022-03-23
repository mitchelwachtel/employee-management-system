const inquirer = require("inquirer");
const cTable = require("console.table");

const db = require("../config/connection");
const {getDeptId} = require("../helpers/deptFuns");

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

async function insertRole(response) {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  getDeptId(response.dept).then((dId) => {
    db.execute(
      `INSERT INTO role(title, salary, department_id) VALUES('${response.name}', '${response.salary}', '${dId}')`
    );
  });
  return;
}

module.exports = {selectRole, getRolesArr, getRoleId, insertRole};
