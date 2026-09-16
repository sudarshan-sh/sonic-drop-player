import { type Column } from "../components/Table";

interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
}

export const generateSongColumns = (
  requestedColumns: string[],
  onAddAction: (songId: number) => void,
): Column<Song>[] => {
  // Master map of all possible available columns
  const columnMap: Record<string, Column<Song>> = {
    title: {
      header: "Title",
      accessor: (song) => (
        <span className="font-medium text-white group-hover:text-emerald-400 transition-colors">
          {song.title}
        </span>
      ),
    },
    artist: {
      header: "Artist",
      accessor: (song) => (
        <span className="text-slate-300">{song.artist}</span>
      ),
    },
    genre: {
      header: "Genre",
      accessor: (song) => (
        <span className="inline-flex items-center rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
          {song.genre}
        </span>
      ),
    },
    actions: {
      header: "Actions",
      accessor: (song) => (
        <button
          onClick={() => onAddAction(song.id)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 active:scale-95 transition"
        >
          <span>+</span> Add to Playlist
        </button>
      ),
    },
  };

  return requestedColumns.map((key) => columnMap[key]).filter(Boolean); // Filters out any invalid keys safely
};
