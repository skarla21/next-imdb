import { NextRequest } from "next/server";
import User from "@/lib/models/user.model";
import { connect } from "@/lib/mongodb/mongoose";
import { Favorite } from "@/lib/types/user";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const PUT = async (req: NextRequest) => {
  const user = await currentUser();
  const client = await clerkClient();
  try {
    await connect();
    const data: Favorite = await req.json();
    if (!user) {
      return { status: 401, body: "Unauthorized" };
    }
    const existingUser = await User.findById(user.publicMetadata.userMongoId);

    if (
      existingUser.favs.some(
        (fav: { id: number }) => Number(fav.id) === Number(data.id)
      )
    ) {
      const updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        { $pull: { favs: { id: data.id } } },
        { new: true }
      );
      const updatedFavs = updatedUser.favs.map((fav: { id: number }) => fav.id);
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favs: updatedFavs,
        },
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        {
          $addToSet: {
            favs: {
              id: data.id,
              title: data.title,
              mediaType: data.mediaType,
              overview: data.overview,
              releaseDate: data.releaseDate,
              voteAverage: data.voteAverage,
              image: data.image,
            },
          },
        },
        { new: true }
      );
      const updatedFavs = updatedUser.favs.map((fav: { id: number }) => fav.id);
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favs: updatedFavs,
        },
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    }
  } catch (error) {
    console.log("Error adding favs to the user: ", error);
    return new Response("Error adding favs to the user", { status: 500 });
  }
};
