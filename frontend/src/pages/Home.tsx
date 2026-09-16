import Songslist from "../components/songs/songslist";
import type { User } from "../types/user.types";

interface HomeProps {
  user: User | null;
}

const Home = ({ user }: HomeProps) => {
  return (
    <div>
      {user && (
        <p className="text-2xl text-center mt-4">
          Hello, {user?.name}! Welcome back to the PERN Auth App.
        </p>
      )}

      {/* render the songs list component */}
      <Songslist />
    </div>
  );
};

export default Home;
