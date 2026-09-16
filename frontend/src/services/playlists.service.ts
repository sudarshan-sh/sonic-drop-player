import { PLAYLISTS_API } from "../config/api";
import { type Playlist } from "../components/Playlists/PlaylistCard";
import { apiClient } from "../utils/apiClients";

export const PlaylistService = {
  async getAllPlaylists(): Promise<Playlist[]> {
    const response = await apiClient.get(`${PLAYLISTS_API}`);
    return response.data.playlists;
  },

  async deletePlaylist(id: number): Promise<void> {
    await apiClient.delete(`${PLAYLISTS_API}/${id}`);
  },

  async addSongToPlaylist(playlistId: number, songId: number): Promise<void> {
    await apiClient.post(`${PLAYLISTS_API}/${playlistId}/songs`, { songId });
  },
};
