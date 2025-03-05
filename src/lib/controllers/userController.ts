import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";
import { UserParams } from "../types/user";

export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
}: UserParams) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
        },
      },
      { upsert: true, new: true }
    );
    return user;
  } catch (error) {
    console.error("Error: Could not create or update user: ", error);
    throw new Error("User operation failed"); //propagate error
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error: Could not delete user: ", error);
    throw new Error("User operation failed"); //propagate error
  }
};
