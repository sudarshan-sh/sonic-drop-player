import { useEffect, useState } from "react";
import {
  PlaylistCard,
  type Playlist,
} from "./../components/Playlists/PlaylistCard";
import { PlaylistHeader } from "../components/Playlists/PlaylistHeader";
import axios from "axios";
import { PLAYLISTS_API } from "../config/api";

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${PLAYLISTS_API}`);
        const data = response.data.playlists;
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const handleOpenCreateModal = () => {
    console.log("Trigger modal open workflow...");
  };

  const handlePlayPlaylist = (id: number) => {
    console.log(`Playing item context id: ${id}`);
  };

  const handleEditPlaylist = (id: number) => {
    console.log(`Editing target details id: ${id}`);
  };

  const handleDeletePlaylist = (id: number) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-zinc-950 text-white">
      {/* 1. Modular Header Slot */}
      <PlaylistHeader onOpenCreateModal={handleOpenCreateModal} />

      {/* 2. Responsive Core List Wrap Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onPlay={handlePlayPlaylist}
            onEdit={handleEditPlaylist}
            onDelete={handleDeletePlaylist}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
