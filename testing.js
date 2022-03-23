const cTable = require("console.table");
const {getManagerId} = require("./helpers/empFuns");
const Employee = require("./lib/Employee");

// const db = require("./config/connection");

// db.query(`SELECT id FROM employee WHERE first_name = 'Susie'`, function (err, result) {

//   console.log(result[0]['id']);

// });

async function main() {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "system_db",
  });

  const [rows, fields] = await db.execute("SELECT * FROM employee");

  console.table(rows);
}

// const test = new Employee("Mitch", "Wach", "Forklift Guy", "Lava Volcano");
// test.empQuery();
// const arr = [];

// getManagerId("Lava", "Volcano").then((id) => {
//   arr.push(id);
// });
// console.log(arr);


