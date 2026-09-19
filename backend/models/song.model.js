// Shape of a song as exposed outside the backend.
export const toPublicSong = (song) => ({
  id: song.id,
  title: song.title,
  artist: song.artist,
  album: song.album,
  release_date: song.release_date,
  genre: song.genre,
  created_at: song.created_at,
});
