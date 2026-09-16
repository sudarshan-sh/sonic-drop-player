interface PlaylistHeaderProps {
  onOpenCreateModal: () => void;
}

export const PlaylistHeader = ({ onOpenCreateModal }: PlaylistHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-zinc-900 pb-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Your Playlists
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Create, manage, and curate your personal audio collections.
        </p>
      </div>
      <button
        onClick={onOpenCreateModal}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-black shadow-md hover:bg-emerald-400 active:scale-95 transition-all"
      >
        <span className="text-lg leading-none">+</span> Create Playlist
      </button>
    </div>
  );
};
