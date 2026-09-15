import { handleResponse } from "../helper/helper.js";
import {
  createPlaylistService,
  deletePlaylistService,
  editPlaylistService,
  getAllPlaylistsService,
} from "../services/playlists.service.js";

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
      playlist: {
        id: newPlaylist.id,
        title: newPlaylist.title || "",
        description: newPlaylist.description || "",
        user_id: newPlaylist.user_id,
        created_at: newPlaylist.created_at,
      },
    });
  } catch (error) {
    console.error("Error in createPlaylistController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all playlists from the database
export const getAllPlaylistsController = async (req, res) => {
  try {
    // get all playlists from the database
    const playlists = await getAllPlaylistsService();

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
  const { playlist_id } = req.params;
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
      playlist: {
        id: updatedPlaylist.id,
        title: updatedPlaylist.title || "",
        description: updatedPlaylist.description || "",
        user_id: updatedPlaylist.user_id,
        created_at: updatedPlaylist.created_at,
      },
    });
  } catch (error) {
    console.error("Error in editPlaylistController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a playlist from the database
export const deletePlaylistController = async (req, res) => {
  const { playlist_id } = req.params;

  if (!playlist_id) {
    return handleResponse(res, 400, "Playlist ID is required");
  }

  try {
    // delete playlist
    const deletedPlaylist = await deletePlaylistService(playlist_id);

    return handleResponse(res, 200, "Playlist deleted successfully", {
      playlist: {
        id: deletedPlaylist.id,
        title: deletedPlaylist.title || "",
        description: deletedPlaylist.description || "",
        user_id: deletedPlaylist.user_id,
        created_at: deletedPlaylist.created_at,
      },
    });
  } catch (error) {
    console.error("Error in deletePlaylistController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
