import mysql from 'mysql2';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// Create a connection pool
const pool = mysql.createPool({
  host: publicRuntimeConfig.DATABASE_HOST,
  user: publicRuntimeConfig.DATABASE_USER,
  password: publicRuntimeConfig.DATABASE_PASSWORD,
  database: publicRuntimeConfig.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10, // You can adjust this value based on your needs
  queueLimit: 0
});

export default pool;
