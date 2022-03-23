const inquirer = require("inquirer");
const cTable = require("console.table");

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

//     //   A very similar thing as with role, but with manager
//     db.query(
//       "SELECT id, first_name, last_name FROM employee",
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         }
//         Object.keys(result).forEach(function (key) {
//           let row = result[key];
//           let name = `${row.first_name} ${row.last_name}`;
//           managersArr.push(name);
//           managersIdArr.push([name, row.id]);
//         });
//       }
//     );

module.exports = {selectEmp, getEmpArr};
