import { handleResponse } from "../helper/helper.js";
import {
  getAllSongsService,
  removeSongService,
} from "../services/songs.service.js";
import { toPublicSong } from "../models/song.model.js";

export const addSongController = async (req, res) => {
  const { playlist_id, song_id } = req.body;

  if (!playlist_id || !song_id) {
    return handleResponse(res, 400, "All fields are required");
  }

  try {
    // add song to the playlist
    const newSong = await addSongService(playlist_id, song_id);

    return handleResponse(res, 201, "Song added successfully", {
      song: toPublicSong(newSong),
    });
  } catch (error) {
    console.error("Error in addSongController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all songs from the database
export const getAllSongsController = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize) || 10, 1), 100);
  const search = req.query.search?.trim() || null;

  try {
    // get a page of songs from the database
    const { songs, pagination } = await getAllSongsService(
      page,
      pageSize,
      search,
    );

    return handleResponse(res, 200, "Songs fetched successfully", {
      songs,
      pagination,
    });
  } catch (error) {
    console.error("Error in getAllSongsController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a song from the playlist
export const removeSongController = async (req, res) => {
  const { song_id } = req.params;
  const { playlist_id } = req.body;

  if (!playlist_id || !song_id) {
    return handleResponse(res, 400, "All fields are required");
  }

  try {
    // delete song from the playlist
    const deletedSong = await removeSongService(playlist_id, song_id);

    return handleResponse(res, 200, "Song removed from the playlist!", {
      song: toPublicSong(deletedSong),
    });
  } catch (error) {
    console.error("Error in deleteSongController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
