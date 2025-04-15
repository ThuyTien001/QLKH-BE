// // db.js
// const mysql = require('mysql2');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   timezone: 'Z',
// }).promise();

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err.message);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// module.exports = connection;

// // require('dotenv').config();
// // const mysql = require('mysql2/promise');
// // const url = require('url');

// // const dbUrl = process.env.JAWSDB_URL;
// // if (!dbUrl) {
// //     console.error('JAWSDB_URL không tồn tại!');
// //     process.exit(1);
// // }

// // const params = url.parse(dbUrl);
// // const [user, password] = params.auth.split(':');
// // const host = params.hostname;
// // const database = params.pathname.replace('/', '');

// // const pool = mysql.createPool({
// //     host,
// //     user,
// //     password,
// //     database,
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     queueLimit: 0,
// // });

// // module.exports = pool;


// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5433,
  ssl: {
    rejectUnauthorized: false, // cần thiết khi kết nối với Yugabyte Cloud
  }
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to YugabyteDB:', err.stack);
  } else {
    console.log('✅ Connected to YugabyteDB');
    release();
  }
});

module.exports = pool;
