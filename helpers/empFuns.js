const inquirer = require("inquirer");
const cTable = require("console.table");
const {getRoleId} = require("./roleFuns");

async function selectEmp() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [rows, fields] = await db.execute("SELECT * FROM employee");
  console.log("\n");
  console.table(rows);
  console.log("\n\n\n\n\n\n\n");
}

async function getEmpArr() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [empArr, fields] = await db.execute(
    "SELECT id, first_name, last_name FROM employee"
  );
  return empArr;
}

async function insertEmp(first_name, last_name, roleId, managerId) {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [empArr, fields] = await db.execute(
    `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${first_name}', '${last_name}', '${roleId}', ${managerId})`
  );
  console.log(`${first_name} was added`);
  return empArr;
}

async function getManagerId(first_name, last_name) {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [id, fields] = await db.execute(
    `SELECT id FROM employee WHERE first_name = '${first_name}'`
  );
  return id[0]["id"];
}

async function empQuery(response) {
  getRoleId(response.role).then((rId) => {
    if (response.manager.split(" ")[0] === "No") {
      insertEmp(response.first_name, response.last_name, rId, null);
    } else {
      getManagerId(
        response.manager.split(" ")[0],
        response.manager.split(" ")[0]
      ).then((mId) => {
        insertEmp(response.first_name, response.last_name, rId, mId);
      });
    }
  });
  return response;
}

module.exports = {selectEmp, getEmpArr, insertEmp, getManagerId, empQuery};
