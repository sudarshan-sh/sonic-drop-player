import express from "express";
import {
  addSongController,
  removeSongController,
  getAllSongsController,
} from "../controllers/songs.controller.js";

const router = express.Router();

// add song to the playlist
router.post("/", addSongController);

// get all songs from the database
router.get("/", getAllSongsController);

// delete a song from the playlist
router.post("/:id", removeSongController);

export default router;
