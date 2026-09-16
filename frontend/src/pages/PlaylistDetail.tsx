/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Table } from "../components/Table";
import { generateSongColumns } from "../utils/columnGenerator";
import { PlaylistService } from "../services/playlists.service";
import type { Song } from "../types/song.types";
import axios from "axios";

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [addToPlaylistError, setAddToPlaylistError] = useState<string | null>(
    null,
  );

  const playlistTitle =
    (location.state as { title?: string } | null)?.title || "Playlist";

  useEffect(() => {
    if (!id) return;
    fetchPlaylistSongs();
  }, [id]);

  const fetchPlaylistSongs = async () => {
    try {
      const data = await PlaylistService.getPlaylistSongs(Number(id));
      setSongs(data);
    } catch (error) {
      console.error("Error fetching playlist songs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromThePlaylist = async (songId: number) => {
    const playlistID = Number(id);
    try {
      await PlaylistService.removeSongFromPlaylist(playlistID, songId);
      // Cleanup states and close modal safely
      setIsAddToPlaylistModalOpen(false);
      alert(
        `Song: ${songs.find((song) => song.id === songId)?.title} removed!`,
      );
      // refresh the playlist details
      fetchPlaylistSongs();
    } catch (error) {
      console.error("Error removing song from playlist:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setAddToPlaylistError(error.response.data.message);
      } else {
        setAddToPlaylistError("Something went wrong. Please try again.");
      }
    }
  };

  const columnsToShow = ["title", "artist", "genre", "actions"];
  const columns = generateSongColumns(
    columnsToShow,
    handleRemoveFromThePlaylist,
    "Remove",
    "remove",
  );

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-500 text-center py-12">
        Loading playlist...
      </div>
    );

  return (
    <div className="px-12 py-6 mx-auto min-h-screen bg-zinc-950 text-white">
      <button
        onClick={() => navigate("/playlists")}
        className="text-sm text-zinc-400 hover:text-white transition mb-4"
      >
        ← Back to Playlists
      </button>

      <h1 className="text-2xl font-bold tracking-tight mb-6">
        {playlistTitle}
      </h1>

      <Table columns={columns} data={songs} />
    </div>
  );
};

export default PlaylistDetail;
