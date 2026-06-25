// db.js

const { Pool } = require('pg');
require('dotenv').config();

/*
  PostgreSQL connection pool
*/
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

/*
  Check database connection
*/
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected DB error:", err);
});

/*
  Create new user
*/
async function createUser(username, email) {
  const query = `
      INSERT INTO users(username, email)
      VALUES($1, $2)
      RETURNING *
  `;

  const values = [username, email];

  const result = await pool.query(query, values);

  return result.rows[0];
}

/*
  Find user by ID
*/
async function findUserById(id) {
  const query = `
      SELECT * FROM users
      WHERE id = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
}

/*
  Update user profile
*/
async function updateUserBio(id, bio) {
  const query = `
      UPDATE users
      SET bio = $1
      WHERE id = $2
  `;

  await pool.query(query, [bio, id]);
}

/*
  Close connection
*/
async function disconnectDB() {
  await pool.end();
  console.log("Database connection closed");
}

module.exports = {
  pool,
  createUser,
  findUserById,
  updateUserBio,
  disconnectDB
};