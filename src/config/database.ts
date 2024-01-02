import mysql from "mysql2/promise";

const config: mysql.PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  idleTimeout: 10000,

  /**
   * close all of the connections when idle timeout.
   */
  maxIdle: 0,
};

export const dbPool = mysql.createPool(config);
