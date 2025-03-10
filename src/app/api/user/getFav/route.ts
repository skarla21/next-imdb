import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { connect } from "@/lib/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const GET = async () => {
  try {
    await connect();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userMongoId = user.publicMetadata?.userMongoId;
    if (!userMongoId || typeof userMongoId !== "string") {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    const existingUser = await User.findById(userMongoId);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ favs: existingUser.favs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
