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

  const [rows, fields] = await db.execute(
    "SELECT * FROM role"
  );
  console.log("\n")
  console.table(rows);
  console.log("\n\n\n\n\n\n\n");
}

async function rolesArr() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [rolesArr, fields] = await db.execute(
    "SELECT id, title FROM role"
  );
  return rolesArr;
}






// const rolesArr = [];
//     const rolesIdArr = [];
//     const managersArr = ["No Manager"];
//     const managersIdArr = [["No Manager", null]];

//     db.query("SELECT id, title FROM role", (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       // iterating through the result by the keys. Placing the role titles in an array for the questioning. Placing the title and the pairing role_id in another array to be used in a few lines
//       Object.keys(result).forEach(function (key) {
//         var row = result[key];
//         rolesArr.push(row.title);
//         rolesIdArr.push([row.title, row.id]);
//       });
//     });


module.exports = {selectRole, rolesArr};
