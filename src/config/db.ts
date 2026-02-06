import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || "host.docker.internal",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Rishika@24680",
  database: process.env.DB_NAME || "farmlokal",
  connectionLimit: 10,
});
