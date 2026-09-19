// Shape of a playlist as exposed outside the backend.
export const toPublicPlaylist = (playlist) => ({
  id: playlist.id,
  title: playlist.title || "",
  description: playlist.description || "",
  user_id: playlist.user_id,
  created_at: playlist.created_at,
});
