import { useEffect, useState } from "react";
import { Table } from "../Table";
import axios from "axios";
import { SONGS_API } from "../../config/api";
import { generateSongColumns } from "../../utils/columnGenerator";

const Songslist = () => {
  const [songs, setSongs] = useState([]);

  // Fetch the data from your API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${SONGS_API}`);
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
  const columnsToShow = ["title", "artist", "genre", "actions"];
  const columns = generateSongColumns(columnsToShow, handleAddToPlaylist);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black tracking-tight">
          All Tracks
        </h1>
      </div>

      {/* Render our highly reusable component */}
      <Table columns={columns} data={songs} />
    </div>
  );
};

export default Songslist;
