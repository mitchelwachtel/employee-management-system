const inquirer = require("inquirer");
const cTable = require("console.table");


async function selectDept() {
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
  console.log("\n\n\n\n\n\n\n");
}

async function getDeptArr() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [deptArr, fields] = await db.execute("SELECT id, name FROM department");
  return deptArr;
}

async function getDeptId(name) {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [id, fields] = await db.execute(
    `SELECT id FROM department WHERE name = '${name}'`
  );
  return id[0]["id"];
}

async function insertDept(response) {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [deptArr, fields] = await db.execute(
    `INSERT INTO department(name) VALUES('${response.dept}')`
  );

  return deptArr;
}

async function deleteDept(response) {
    const mysql = require("mysql2/promise");
  
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootroot",
      database: "system_db",
    });
  
    getDeptId(response.dept).then((dId) => {
      db.execute(`DELETE FROM department WHERE id = '${dId}'`);
    });
    return;
  }

module.exports = {selectDept, getDeptArr, insertDept, getDeptId, deleteDept};
