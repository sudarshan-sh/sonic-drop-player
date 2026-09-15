import pool from "../config/db.js";

// create a new user in the database, returns the created user object
export const createUser = async (name, email, hashedPassword) => {
  const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, hashedPassword];
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // return the created user object
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// find a user by email in the database, returns the user object if found, otherwise null
export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];
  try {
    const result = await pool.query(query, values);
    return result.rows[0] || null; // return the user object if found, otherwise null
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};
