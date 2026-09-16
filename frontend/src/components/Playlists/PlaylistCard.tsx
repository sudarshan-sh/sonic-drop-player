/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from "react";

export interface Playlist {
  id: number;
  name: string;
  description: string;
  songCount: number;
}

interface PlaylistCardProps {
  playlist: Playlist;
  onPlay: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PlaylistCard = ({
  playlist,
  onPlay,
  onEdit,
  onDelete,
}: PlaylistCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="group relative bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 hover:bg-zinc-900/80 transition-all duration-300">
      <div className="relative aspect-square w-full rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-md flex items-center justify-center mb-4 overflow-hidden border border-zinc-800">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300 select-none">
          🎵
        </span>

        {/* <button
          onClick={() => onPlay(playlist.id)}
          className="absolute bottom-3 right-3 bg-emerald-500 text-black p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button> */}
      </div>

      <div className="flex items-start justify-between gap-2 relative">
        <div className="truncate flex-1">
          <h3 className="font-bold text-zinc-100 text-base truncate group-hover:text-emerald-400 transition-colors">
            {playlist.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2 min-h-[2rem]">
            {playlist.description || "No description provided."}
          </p>
          <span className="inline-block mt-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            {playlist.songCount} {playlist.songCount === 1 ? "track" : "tracks"}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>

          {/* Dropdown Menu Overlay */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-36 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1 z-20 animate-in fade-in slide-in-from-top-1 duration-100">
                <button
                  onClick={() => {
                    onEdit(playlist.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  ✏️ Edit Details
                </button>
                <hr className="border-zinc-800 my-1" />
                <button
                  onClick={() => {
                    onDelete(playlist.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                >
                  🗑️ Delete Mix
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
