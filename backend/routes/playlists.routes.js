import express from "express";
import {
  createPlaylistController,
  deletePlaylistController,
  editPlaylistController,
  getAllPlaylistsController,
} from "../controllers/playlists.controller.js";

const router = express.Router();

// create a new playlist
router.post("/create-playlist", createPlaylistController);

// get all playlists from the database
router.get("/playlists", getAllPlaylistsController);

// edit a playlist in the database
router.put("/edit-playlist", editPlaylistController);

// delete a playlist from the database
router.delete("/delete-playlist", deletePlaylistController);

export default router;
