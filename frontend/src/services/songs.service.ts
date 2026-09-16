import { SONGS_API } from "../config/api";
import type { Song, Pagination } from "../types/song.types";
import { apiClient } from "../utils/apiClients";

export const SongsService = {
  async getSongs(
    page: number,
    pageSize: number,
    search?: string,
  ): Promise<{ songs: Song[]; pagination: Pagination }> {
    const params: Record<string, string | number> = { page, pageSize };
    if (search) params.search = search;

    const response = await apiClient.get(`${SONGS_API}`, { params });
    return {
      songs: response.data.songs,
      pagination: response.data.pagination,
    };
  },
};
