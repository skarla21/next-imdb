export interface Result {
  adult?: boolean;
  backdrop_path?: string;
  poster_path?: string;
  genre_ids?: number[];
  id: number;
  media_type?: string;
  origin_country?: string[];
  original_language?: string;
  original_title?: string;
  overview: string;
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
