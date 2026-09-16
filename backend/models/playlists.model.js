import pool from "../config/db.js";

// create a new playlist in the database, returns the created playlist object
export const createPlaylist = async (title, description, user_id) => {
  const query = `INSERT INTO playlists (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`;
  const values = [title, description, user_id];
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // return the created playlist object
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};

// get all playlists from the database, including how many songs each has
export const getAllPlaylists = async (userId) => {
  const query = `
    SELECT p.*, COUNT(ps.song_id)::int AS "songCount"
    FROM playlists p
    LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
    WHERE p.user_id = $1
    GROUP BY p.id
  `;
  const values = [userId];
  try {
    const result = await pool.query(query, values);
    return result.rows; // return an array of playlist objects
  } catch (error) {
    console.error("Error getting all playlists:", error);
    throw error;
  }
};

// get all songs that belong to a playlist
export const getPlaylistSongs = async (playlist_id) => {
  const query = `
    SELECT s.*
    FROM songs s
    INNER JOIN playlist_songs ps ON ps.song_id = s.id
    WHERE ps.playlist_id = $1
  `;
  const values = [playlist_id];
  try {
    const result = await pool.query(query, values);
    return result.rows; // return an array of song objects
  } catch (error) {
    console.error("Error getting playlist songs:", error);
    throw error;
  }
};

// edit a playlist in the database, returns the updated playlist object
export const editPlaylist = async (playlist_id, title, description) => {
  const query = `UPDATE playlists SET title = $1, description = $2 WHERE id = $3 RETURNING *`;
  const values = [title, description, playlist_id];
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // return the updated playlist object
  } catch (error) {
    console.error("Error editing playlist:", error);
    throw error;
  }
};

// delete a playlist from the database
export const deletePlaylist = async (playlist_id) => {
  const query = `DELETE FROM playlists WHERE id = $1`;
  const values = [playlist_id];
  try {
    const result = await pool.query(query, values);
    return result.rows; // return the deleted playlist object
  } catch (error) {
    console.error("Error deleting playlist:", error);
    throw error;
  }
};
