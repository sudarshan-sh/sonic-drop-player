import { PLAYLISTS_API } from "../config/api";
import { type Playlist } from "../components/Playlists/PlaylistCard";
import type { Song } from "../types/song.types";
import { apiClient } from "../utils/apiClients";

export const PlaylistService = {
  // create a new playlist
  async createPlaylist(
    title: string,
    description: string,
    userId: number,
  ): Promise<Playlist> {
    const playlistData = {
      title,
      description,
      user_id: userId,
    };
    const response = await apiClient.post(`${PLAYLISTS_API}`, playlistData);
    return response.data.playlist;
  },

  async getAllPlaylists(): Promise<Playlist[]> {
    const response = await apiClient.get(`${PLAYLISTS_API}`);
    return response.data.playlists;
  },

  async deletePlaylist(id: number): Promise<void> {
    await apiClient.delete(`${PLAYLISTS_API}/${id}`);
  },

  async addSongToPlaylist(playlistId: number, songId: number): Promise<void> {
    await apiClient.post(`${PLAYLISTS_API}/${playlistId}/songs`, {
      song_id: songId,
    });
  },

  async getPlaylistSongs(playlistId: number): Promise<Song[]> {
    const response = await apiClient.get(
      `${PLAYLISTS_API}/${playlistId}/songs`,
    );
    return response.data.songs;
  },
};
