import { useEffect, useState } from "react";
import { Table, type Column } from "../Table";
import axios from "axios";
import { SONGS_API } from "../../config/api";

// Define the structure matching your PostgreSQL schema
interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
}

const Songslist = () => {
  const [songs, setSongs] = useState([]);

  // Fetch the data from your API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${SONGS_API}`);
        console.log("Fetched songs:", response.data);
        const data = response.data.songs;
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  // Handler for adding a song to a playlist
  const handleAddToPlaylist = (songId: number) => {
    console.log(`Add song ID ${songId} to playlist request triggered.`);
    // Your Axios POST route integration logic will go here
  };

  // Define Table Column rules explicitly
  const columns: Column<Song>[] = [
    {
      header: "Title",
      accessor: (song) => (
        <span className="font-medium text-white group-hover:text-emerald-400 transition-colors">
          {song.title}
        </span>
      ),
    },
    {
      header: "Artist",
      accessor: (song) => <span className="text-zinc-400">{song.artist}</span>,
    },
    {
      header: "Genre",
      accessor: (song) => (
        <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
          {song.genre}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (song) => (
        <button
          onClick={() => handleAddToPlaylist(song.id)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 active:scale-95 transition"
        >
          <span>+</span> Add to Playlist
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          All Tracks
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Browse through the master catalog to organize your audio vibe.
        </p>
      </div>

      {/* Render our highly reusable component */}
      <Table columns={columns} data={songs} />
    </div>
  );
};

export default Songslist;
