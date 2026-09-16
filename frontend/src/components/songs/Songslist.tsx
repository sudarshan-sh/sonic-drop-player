/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { Table } from "../Table";
import { generateSongColumns } from "../../utils/columnGenerator";
import { AddToPlaylistModal } from "../AddToPlaylistModal";
import { SongsService } from "../../services/songs.service";
import type { Song } from "../../types/song.types";
import { PlaylistService } from "../../services/playlists.service";
import type { Playlist } from "../Playlists/PlaylistCard";

const Songslist = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);

  // Fetch the data from your API
  useEffect(() => {
    fetchSongs();
    fetchPlaylists();
  }, []);

  const fetchSongs = async () => {
    try {
      const data = await SongsService.getSongs();
      setSongs(data as unknown as Song[]);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const data = await PlaylistService.getAllPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  // Handler for adding a song to a playlist
  const handleAddToPlaylist = (songId: number) => {
    console.log(`Add song ID ${songId} to playlist request triggered.`);
    // Your Axios POST route integration logic will go here
    setIsAddToPlaylistModalOpen(true);
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

      {/* Add to Playlist Modal */}
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        playlists={playlists}
        onSelectPlaylist={() => console.log("Selected playlist")}
      />
    </div>
  );
};

export default Songslist;
