const mysql = require("mysql2/promise");
require('dotenv').config();

let db;

async function getDB() {
  try {
    db = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password : process.env.DATABASE_PASSWORD,
      database: "finance_app",
    });

    console.log('successfully connected to database.');
  } catch (error) {
    console.log(error);
  }
}

getDB();

module.exports = db;
