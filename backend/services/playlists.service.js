import {
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getAllPlaylists,
  getPlaylistSongs,
} from "../repositories/playlists.repository.js";

export const createPlaylistService = async (title, description, user_id) => {
  try {
    const playlist = await createPlaylist(title, description, user_id);
    return playlist;
  } catch (error) {
    console.error("Error in createPlaylistService:", error);
    throw error;
  }
};

// get all playlists from the database
export const getAllPlaylistsService = async (userId) => {
  try {
    const playlists = await getAllPlaylists(userId);
    return playlists;
  } catch (error) {
    console.error("Error in getAllPlaylistsService:", error);
    throw error;
  }
};

// edit a playlist in the database
export const editPlaylistService = async (playlist_id, title, description) => {
  try {
    // edit playlist
    const updatedPlaylist = await editPlaylist(playlist_id, title, description);
    return updatedPlaylist;
  } catch (error) {
    console.error("Error in editPlaylistService:", error);
    throw error;
  }
};

// delete a playlist from the database
export const deletePlaylistService = async (playlist_id) => {
  try {
    // delete playlist
    const deletedPlaylist = await deletePlaylist(playlist_id);
    return deletedPlaylist;
  } catch (error) {
    console.error("Error in deletePlaylistService:", error);
    throw error;
  }
};

// get all songs that belong to a playlist
export const getPlaylistSongsService = async (playlist_id) => {
  try {
    const songs = await getPlaylistSongs(playlist_id);
    return songs;
  } catch (error) {
    console.error("Error in getPlaylistSongsService:", error);
    throw error;
  }
};
