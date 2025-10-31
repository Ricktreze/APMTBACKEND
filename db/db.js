require("dotenv").config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Admin',
  database: 'missao',
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0
});

module.exports = pool