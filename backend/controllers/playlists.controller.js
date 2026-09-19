import { handleResponse } from "../helper/helper.js";
import {
  createPlaylistService,
  deletePlaylistService,
  editPlaylistService,
  getAllPlaylistsService,
  getPlaylistSongsService,
} from "../services/playlists.service.js";
import {
  addSongService,
  removeSongFromPlaylistService,
} from "../services/songs.service.js";
import { toPublicPlaylist } from "../models/playlist.model.js";
import { toPublicSong } from "../models/song.model.js";

export const createPlaylistController = async (req, res) => {
  const { title, description, user_id } = req.body;

  if (!title || !user_id) {
    return handleResponse(res, 400, "Title and user_id is required");
  }

  try {
    // create playlist
    const newPlaylist = await createPlaylistService(
      title,
      description,
      user_id,
    );

    return handleResponse(res, 201, "Playlist created successfully", {
      playlist: toPublicPlaylist(newPlaylist),
    });
  } catch (error) {
    console.error("Error in createPlaylistController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all playlists from the database
export const getAllPlaylistsController = async (req, res) => {
  const userId = req.user.id;
  try {
    // get all playlists from the database
    const playlists = await getAllPlaylistsService(userId);

    return handleResponse(res, 200, "Playlists fetched successfully", {
      playlists,
    });
  } catch (error) {
    console.error("Error in getAllPlaylistsController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// edit a playlist in the database
export const editPlaylistController = async (req, res) => {
  const playlist_id = req.params.id;
  const { title, description } = req.body;

  if (!playlist_id || !title) {
    return handleResponse(res, 400, "All fields are required");
  }

  try {
    // edit playlist
    const updatedPlaylist = await editPlaylistService(
      playlist_id,
      title,
      description,
    );

    return handleResponse(res, 200, "Playlist updated successfully", {
      playlist: toPublicPlaylist(updatedPlaylist),
    });
  } catch (error) {
    console.error("Error in editPlaylistController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a playlist from the database
export const deletePlaylistController = async (req, res) => {
  const playlist_id = req.params.id;

  if (!playlist_id) {
    return handleResponse(res, 400, "Playlist ID is required");
  }

  try {
    // delete playlist
    const deletedPlaylist = await deletePlaylistService(playlist_id);

    return handleResponse(res, 200, "Playlist deleted successfully", {
      playlist: toPublicPlaylist(deletedPlaylist),
    });
  } catch (error) {
    console.error("Error in deletePlaylistController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add a song to a playlist
export const addSongToPlaylistController = async (req, res) => {
  const playlist_id = req.params.id;
  const { song_id } = req.body;

  if (!playlist_id || !song_id) {
    return handleResponse(res, 400, "All fields are required");
  }

  try {
    const playlistID = parseInt(playlist_id);
    // add song to the playlist
    const newSong = await addSongService(playlistID, song_id);

    return handleResponse(res, 201, "Song added successfully", {
      song: toPublicSong(newSong),
    });
  } catch (error) {
    console.error("Error in addSongToPlaylistController:", error);
    return handleResponse(
      res,
      error.status || 500,
      error.status ? error.message : "Internal server error",
    );
  }
};

// remove a song from a playlist
export const removeSongFromPlaylistController = async (req, res) => {
  const playlist_id = req.params.id;
  const song_id = req.params.songId;

  if (!playlist_id || !song_id) {
    return handleResponse(res, 400, "All fields are required");
  }

  try {
    const playlistID = parseInt(playlist_id);
    const songID = parseInt(song_id);
    // remove song from the playlist
    await removeSongFromPlaylistService(playlistID, songID);

    return handleResponse(res, 200, "Song removed from the playlist!");
  } catch (error) {
    console.error("Error in removeSongFromPlaylistController:", error);
    return handleResponse(
      res,
      error.status || 500,
      error.status ? error.message : "Internal server error",
    );
  }
};

// get all songs that belong to a playlist
export const getPlaylistSongsController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return handleResponse(res, 400, "Playlist ID is required");
  }

  try {
    const songs = await getPlaylistSongsService(parseInt(id));

    return handleResponse(res, 200, "Playlist songs fetched successfully", {
      songs,
    });
  } catch (error) {
    console.error("Error in getPlaylistSongsController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
