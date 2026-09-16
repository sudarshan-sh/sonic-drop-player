import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlaylistCard,
  type Playlist,
} from "./../components/Playlists/PlaylistCard";
import { PlaylistHeader } from "../components/Playlists/PlaylistHeader";
import { PlaylistService } from "../services/playlists.service";
import CreatePlaylistModal from "../components/CreatePlaylistModal";

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await PlaylistService.getAllPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async (title: string, description: string) => {
    // get user info from local storage
    const user = JSON.parse(localStorage.getItem("user") as string);
    if (!user) return;
    try {
      const playlist = await PlaylistService.createPlaylist(
        title,
        description,
        user.id,
      );
      setPlaylists([...playlists, playlist]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleViewPlaylist = (id: number) => {
    const playlist = playlists.find((p) => p.id === id);
    navigate(`/playlists/${id}`, { state: { title: playlist?.title } });
  };

  const handleEditPlaylist = (id: number) => {
    console.log(`Editing target details id: ${id}`);
  };

  const handleDeletePlaylist = (id: number) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

  if (loading)
    return (
      <div className="text-zinc-500 text-center py-12">
        Loading playlists...
      </div>
    );

  return (
    <div className="px-12 py-6 mx-auto min-h-screen bg-zinc-950 text-white">
      <PlaylistHeader onOpenCreateModal={() => setIsModalOpen(true)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onPlay={handleViewPlaylist}
            onEdit={handleEditPlaylist}
            onDelete={handleDeletePlaylist}
          />
        ))}
      </div>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePlaylist}
      />
    </div>
  );
};

export default Playlists;
