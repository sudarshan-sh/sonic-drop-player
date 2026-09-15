import { handleResponse } from "../helper/helper.js";
import {
  getAllSongsService,
  removeSongService,
} from "../services/songs.service.js";

export const addSongController = async (req, res) => {
  const { playlist_id, song_id } = req.body;

  if (!playlist_id || !song_id) {
    handleResponse(res, 400, "All fields are required");
  }

  try {
    // add song to the playlist
    const newSong = await addSongService(playlist_id, song_id);

    handleResponse(res, 201, "Song added successfully", {
      song: {
        id: newSong.id,
        title: newSong.title,
        artist: newSong.artist,
        album: newSong.album,
        release_date: newSong.release_date,
        genre: newSong.genre,
      },
    });
  } catch (error) {
    console.error("Error in addSongController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all songs from the database
export const getAllSongsController = async (req, res) => {
  try {
    // get all songs from the database
    const songs = await getAllSongsService();

    handleResponse(res, 200, "Songs fetched successfully", {
      songs,
    });
  } catch (error) {
    console.error("Error in getAllSongsController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a song from the playlist
export const removeSongController = async (req, res) => {
  const { playlist_id, song_id } = req.body;

  if (!playlist_id || !song_id) {
    handleResponse(res, 400, "All fields are required");
  }

  try {
    // delete song from the playlist
    const deletedSong = await removeSongService(playlist_id, song_id);

    handleResponse(res, 200, "Song removed from the playlist!", {
      song: {
        id: deletedSong.id,
        title: deletedSong.title,
        artist: deletedSong.artist,
        album: deletedSong.album,
        release_date: deletedSong.release_date,
        genre: deletedSong.genre,
        created_at: deletedSong.created_at,
      },
    });
  } catch (error) {
    console.error("Error in deleteSongController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
