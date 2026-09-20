import { useEffect, useState } from "react";
import Songslist from "../components/songs/Songslist";
import type { User } from "../types/user.types";
import type { Song } from "../types/song.types";
import { SongsService } from "../services/songs.service";
import SearchBar from "../components/SearchBar";

interface HomeProps {
  user: User | null;
}

const Home = ({ user }: HomeProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { songs, pagination } = await SongsService.getSongs(
          page,
          pageSize,
          search,
        );
        setSongs(songs);
        setTotalPages(pagination.totalPages);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, [page, pageSize, search]);

  // reset to page 1 whenever the search term changes
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      {user && (
        <p className="text-2xl text-center mt-4">
          <span className="text-zinc-400">Welcome back, {user.name}!</span>
        </p>
      )}

      {/* search bar */}
      <SearchBar value={search} onSearch={handleSearchChange} />

      {/* render the songs list component */}
      <Songslist songs={songs} />

      <div className="flex justify-center items-center gap-4 mt-4 pb-8">
        {/* first page */}
        <button
          onClick={() => setPage(1)}
          disabled={page <= 1}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Go to first page"
          title="Go to first page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page <= 1}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-zinc-400">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
        {/* last page */}
        <button
          onClick={() => setPage(totalPages)}
          disabled={page >= totalPages}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Go to last page"
          title="Go to last page"
          style={{ marginLeft: "-0.5rem" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
