import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import songsRoutes from "./routes/songs.routes.js";
import playlistsRoutes from "./routes/playlists.routes.js";

dotenv.config(); // reads the key-value pairs from .env and inject the values in process.env

const app = express();

app.use(cors()); // to allow cross-origin requests
app.use(express.json()); // to parse json request body
app.use(cookieParser());

// +++++register the routes with the application+++++
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/playlists", playlistsRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`);
});
