import mongoose from "mongoose";
import { Favorite, UserType } from "../types/user";

const FavSchema = new mongoose.Schema<Favorite>({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ["movie", "tv"],
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  voteAverage: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema<UserType>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profilePicture: {
      type: String, //url of the image
      required: true,
    },
    favs: {
      type: [FavSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
