import mysql from 'mysql2';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const connection = mysql.createConnection({
  host: publicRuntimeConfig.DATABASE_HOST,
  user: publicRuntimeConfig.DATABASE_USER,
  password: publicRuntimeConfig.DATABASE_PASSWORD,
  database: publicRuntimeConfig.DATABASE_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    throw err;
  }
});

export default connection;
