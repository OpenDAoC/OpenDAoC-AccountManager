import mysql from 'mysql2';
import config from '../config';

const connection = mysql.createConnection({
  host: config.DATABASE_HOST,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    throw err;
  }
});

export default connection;
