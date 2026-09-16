import pool from "../config/db.js";

// add a song to a playlist
export const addSong = async (playlist_id, song_id) => {
  const query = `INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2) RETURNING *`;
  const values = [playlist_id, song_id];
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // return the created playlist_song object
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    throw error;
  }
};

// find song by id to check if it exists in the playlist
export const findSongById = async (playlist_id, song_id) => {
  const query = `SELECT * FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2`;
  const values = [playlist_id, song_id];
  try {
    const result = await pool.query(query, values);
    return result.rows[0] || null; // return the song object if found, otherwise null
  } catch (error) {
    console.error("Error finding song by id:", error);
    throw error;
  }
};

// get a page of songs from the database, optionally filtered by a search term
export const getAllSongs = async (page, pageSize, search) => {
  const offset = (page - 1) * pageSize;
  const searchTerm = search ? `%${search}%` : null;

  const query = `
    SELECT *, COUNT(*) OVER()::int AS total_count
    FROM songs
    WHERE $1::text IS NULL OR title ILIKE $1 OR artist ILIKE $1
    ORDER BY id
    LIMIT $2 OFFSET $3
  `;
  const values = [searchTerm, pageSize, offset];

  try {
    const result = await pool.query(query, values);
    const total = result.rows[0]?.total_count || 0;
    const songs = result.rows.map(({ total_count, ...song }) => song);
    return { songs, total };
  } catch (error) {
    console.error("Error getting all songs:", error);
    throw error;
  }
};

// delete a song from the playlist
export const removeSong = async (playlist_id, song_id) => {
  const query = `DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2`;
  const values = [playlist_id, song_id];
  try {
    const result = await pool.query(query, values);
    return result.rows; // return the deleted playlist_song object
  } catch (error) {
    console.error("Error deleting song from playlist:", error);
    throw error;
  }
};
