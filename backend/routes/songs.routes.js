import express from "express";
import {
  addSongController,
  removeSongController,
  getAllSongsController,
} from "../controllers/songs.controller.js";

const router = express.Router();

// add song to the playlist
router.post("/add-song", addSongController);
router.get("/songs", getAllSongsController);
router.post("/remove-song", removeSongController);

export default router;
