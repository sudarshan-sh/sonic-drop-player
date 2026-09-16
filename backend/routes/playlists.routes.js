import express from "express";
import {
  createPlaylistController,
  deletePlaylistController,
  editPlaylistController,
  getAllPlaylistsController,
} from "../controllers/playlists.controller.js";
import { protectedRoute } from "../middleware/auth.js";

const router = express.Router();

// create a new playlist
router.post("/", createPlaylistController);

// get all playlists from the database based on the user id
router.get("/", protectedRoute, getAllPlaylistsController);

// edit a playlist in the database
router.put("/:id", editPlaylistController);

// delete a playlist from the database
router.delete("/:id", deletePlaylistController);

export default router;
