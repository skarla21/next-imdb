import { Result } from "./data";
import { Favorite } from "./user";

export interface ResultsProps {
  results: Result[];
}

export interface CardProps {
  result: Result;
}

export type AddToFavProps = Favorite;
