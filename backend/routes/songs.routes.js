import express from "express";
import {
  addSongController,
  removeSongController,
  getAllSongsController,
} from "../controllers/songs.controller.js";

const router = express.Router();

// add song to the playlist
router.post("/add-song", addSongController);

// get all songs from the database
router.get("/songs", getAllSongsController);

// delete a song from the playlist
router.post("/remove-song", removeSongController);

export default router;
