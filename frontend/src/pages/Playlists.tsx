/* eslint-disable @typescript-eslint/no-unused-vars */
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
  //   mode 'edit' or 'create'
  const [mode, setMode] = useState<"edit" | "create">("create");
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
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

  const handleSubmitPlaylist = async (title: string, description: string) => {
    if (mode === "edit" && editingPlaylist) {
      try {
        await PlaylistService.editPlaylist(
          editingPlaylist.id,
          title,
          description,
        );
        setPlaylists(
          playlists.map((p) =>
            p.id === editingPlaylist.id ? { ...p, title, description } : p,
          ),
        );
        setEditingPlaylist(null);
      } catch (error) {
        console.error("Error editing playlist:", error);
      }
      return;
    }

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
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setMode("create");
    setEditingPlaylist(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMode("create");
    setEditingPlaylist(null);
  };

  const handleViewPlaylist = (id: number) => {
    const playlist = playlists.find((p) => p.id === id);
    navigate(`/playlists/${id}`, { state: { title: playlist?.title } });
  };

  const handleEditPlaylist = (id: number) => {
    setMode("edit");
    setEditingPlaylist(playlists.find((p) => p.id === id) ?? null);
    setIsModalOpen(true);
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
      <PlaylistHeader onOpenCreateModal={handleOpenCreateModal} />

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
        onClose={handleCloseModal}
        onSubmit={handleSubmitPlaylist}
        mode={mode}
        editingPlaylist={editingPlaylist}
      />
    </div>
  );
};

export default Playlists;
