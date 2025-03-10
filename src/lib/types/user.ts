import { Document } from "mongoose";

export interface EmailAddress {
  id: string;
  email_address: string;
  verification: {
    status: string;
    strategy: string;
  };
  created_at: number;
  updated_at: number;
}

export interface UserParams {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: EmailAddress[];
}

export interface Favorite {
  id: number;
  title: string | undefined;
  mediaType: "movie" | "tv";
  image: string | undefined;
  overview: string;
  releaseDate: string | undefined;
  voteAverage: number | undefined;
}

export interface UserType extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  favs: Favorite[];
}
