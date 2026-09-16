import { useEffect, useState } from "react";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  debounceMs?: number;
}

const SearchBar = ({ value, onSearch, debounceMs = 400 }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);

  // debounce: only notify the parent (and trigger a fetch) after typing pauses
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) onSearch(inputValue);
    }, debounceMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, debounceMs]);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search by title or artist..."
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
};

export default SearchBar;
