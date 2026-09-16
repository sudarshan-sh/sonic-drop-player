/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "../Table";
import { generateSongColumns } from "../../utils/columnGenerator";
import { AddToPlaylistModal } from "../AddToPlaylistModal";
import type { Song } from "../../types/song.types";
import { PlaylistService } from "../../services/playlists.service";
import type { Playlist } from "../Playlists/PlaylistCard";
import { useNavigate } from "react-router-dom";

const Songslist = ({ songs }: { songs: Song[] }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [activeSongID, setActiveSongID] = useState<number | null>(null);
  const [addToPlaylistError, setAddToPlaylistError] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  // Fetch the data from your API
  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const data = await PlaylistService.getAllPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const onSelectPlaylist = async (
    playlistId: number,
    playlistTitle?: string,
  ) => {
    if (!activeSongID) return;

    const addedSong = songs.find((song) => song.id === activeSongID);
    const selectedPlaylistTitle =
      playlistTitle ??
      playlists.find((playlist) => playlist.id === playlistId)?.title;

    try {
      await PlaylistService.addSongToPlaylist(playlistId, activeSongID);

      // Cleanup states and close modal safely
      setIsAddToPlaylistModalOpen(false);
      setActiveSongID(null);
      setAddToPlaylistError(null);
      alert(
        `Song: ${addedSong?.title} added to the playlist: ${selectedPlaylistTitle}!`,
      );

      // Navigate to the playlists dashboard view
      navigate(`/playlists`);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setAddToPlaylistError(error.response.data.message);
      } else {
        setAddToPlaylistError("Something went wrong. Please try again.");
      }
    }
  };

  const handleAddToPlaylist = (songId: number) => {
    setActiveSongID(songId);
    setAddToPlaylistError(null);
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
        onClose={() => {
          setIsAddToPlaylistModalOpen(false);
          setAddToPlaylistError(null);
        }}
        playlists={playlists}
        onSelectPlaylist={onSelectPlaylist}
        errorMessage={addToPlaylistError}
      />
    </div>
  );
};

export default Songslist;
