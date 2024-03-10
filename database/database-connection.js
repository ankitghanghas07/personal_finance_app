const mysql = require("mysql2/promise");
require("dotenv").config();

let db;

function getDb() {
  try {
    db = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: process.env.DATABASE_PASSWORD,
      database: "finance_app",
    });

    console.log("successfully connected to database.");
    return db;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getDb: getDb,
};
