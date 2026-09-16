import { type Column } from "../components/Table";
import type { Song } from "../types/song.types";

type ActionVariant = "add" | "remove";

const actionVariantStyles: Record<
  ActionVariant,
  { icon: string; className: string }
> = {
  add: {
    icon: "+",
    className: "bg-emerald-600 hover:bg-emerald-500",
  },
  remove: {
    icon: "−",
    className: "bg-red-600 hover:bg-red-500",
  },
};

export const generateSongColumns = (
  requestedColumns: string[],
  onAction: (songId: number) => void,
  actionLabel: string = "Add to Playlist",
  actionVariant: ActionVariant = "add",
): Column<Song>[] => {
  const { icon, className: actionClassName } =
    actionVariantStyles[actionVariant];
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
      accessor: (song) => <span className="text-slate-300">{song.artist}</span>,
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
          onClick={() => onAction(song.id)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm active:scale-95 transition ${actionClassName}`}
        >
          <span>{icon}</span> {actionLabel}
        </button>
      ),
    },
  };

  return requestedColumns.map((key) => columnMap[key]).filter(Boolean); // Filters out any invalid keys safely
};
