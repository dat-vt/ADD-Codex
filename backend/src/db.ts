import mysql from "mysql2/promise";

export type DbPool = mysql.Pool;

export const createPool = (): DbPool => {
  const {
    DB_HOST = "localhost",
    DB_PORT = "3306",
    DB_USER = "travel",
    DB_PASSWORD = "travelpass",
    DB_NAME = "travel_app"
  } = process.env;

  return mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 10
  });
};

export const ensureConnection = async (pool: DbPool): Promise<void> => {
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
};
