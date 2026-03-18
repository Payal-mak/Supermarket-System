import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "supermarket",
  password: "Tanvi#3008",
  port: 5432,
});

export default pool;