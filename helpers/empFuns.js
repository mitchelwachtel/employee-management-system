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

  // SHOULD role_id and man_id be in '' or not??
  const [empArr, fields] = await db.execute(
    `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${first_name}', '${last_name}', '${roleId}', '${managerId}')`
  );
  // console.log('\n');
  // console.log(`${first_name} was added`);
  // console.log('\n');
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

async function updateEmpRole(response) {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const firstName = response.emp.split(" ")[0];
  const lastName = response.emp.split(" ")[0];

  getRoleId(response.role).then((rId) => {
    db.execute(
      `UPDATE employee SET role_id = '${rId}' WHERE first_name = '${firstName}'`
    );
  });

  // console.log("\n");
  // console.log(`${firstName} was updated`);
  // console.log('\n');
  return await getRoleId(response.role);
}

module.exports = {
  selectEmp,
  getEmpArr,
  insertEmp,
  getManagerId,
  empQuery,
  updateEmpRole,
};
