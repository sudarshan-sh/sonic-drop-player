import {
  addSong,
  removeSong,
  getAllSongs,
  findSongById,
} from "../models/songs.model.js";

export const addSongService = async (playlist_id, song_id) => {
  try {
    // duplicate check: same song in the playlist
    const existingEntry = await findSongById(playlist_id, song_id);

    if (existingEntry) {
      const error = new Error("Song already exists in the playlist");
      error.status = 400;
      throw error;
    }

    // add song to the playlist
    const newSong = await addSong(playlist_id, song_id);
    return newSong;
  } catch (error) {
    console.error("Error in addSongService:", error);
    throw error;
  }
};

// get all songs from the database
export const getAllSongsService = async () => {
  try {
    const songs = await getAllSongs();
    return songs;
  } catch (error) {
    console.error("Error in getAllSongsService:", error);
    throw error;
  }
};

// delete a song from the playlist
export const removeSongService = async (playlist_id, song_id) => {
  try {
    // delete song from the playlist
    const deletedSong = await removeSong(playlist_id, song_id);
    return deletedSong;
  } catch (error) {
    console.error("Error in deleteSongService:", error);
    throw error;
  }
};
