import { Result } from "./data";

export interface ResultsProps {
  results: Result[];
}

export interface CardProps {
  result: Result;
}

export interface AddToFavProps {
  id: number;
  title: string | undefined;
  media_type: "movie" | "tv";
  image: string | undefined;
  overview: string;
  releaseDate: string | undefined;
  voteCount: number | undefined;
}
