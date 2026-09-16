/* eslint-disable no-unused-vars */
import type { Playlist } from "./Playlists/PlaylistCard";

interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlists: Playlist[];
  onSelectPlaylist: (playlistId: number) => void;
  errorMessage?: string | null;
}

export const AddToPlaylistModal = ({
  isOpen,
  onClose,
  playlists,
  onSelectPlaylist,
  errorMessage,
}: AddToPlaylistModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Add to Playlist</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {errorMessage}
          </div>
        )}

        {/* Scrollable Playlist Selection List */}
        <div className="mt-4 max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist.id)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-800/40 border border-zinc-800/60 hover:border-emerald-500 hover:bg-zinc-800 text-left transition group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl group-hover:scale-110 transition-transform">
                  🎵
                </span>
                <span className="font-medium text-zinc-200 group-hover:text-white">
                  {playlist.title}
                </span>
              </div>
              <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-400">
                {playlist.songCount} tracks
              </span>
            </button>
          ))}
        </div>

        {/* Footer Quick Action */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center">
          <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition">
            + Create New Playlist
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
