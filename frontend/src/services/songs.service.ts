import { SONGS_API } from "../config/api";
import { type Playlist } from "../components/Playlists/PlaylistCard";
import { apiClient } from "../utils/apiClients";

export const SongsService = {
  async getSongs(): Promise<Playlist[]> {
    const response = await apiClient.get(`${SONGS_API}`);
    return response.data.songs;
  },
};
