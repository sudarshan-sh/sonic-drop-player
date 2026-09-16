export type Song = {
  id: number;
  title: string;
  artist: string;
  genre: string;
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};
