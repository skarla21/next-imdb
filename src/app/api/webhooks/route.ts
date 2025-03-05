import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import {
  createOrUpdateUser,
  deleteUser,
} from "@/lib/controllers/userController";
import { type EmailAddress } from "@/lib/types/user";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do the actions with payload
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    try {
      const { first_name, last_name, image_url, email_addresses } = evt.data;
      if (!id || !email_addresses) {
        throw new Error("Missing required user data");
      }

      const user = await createOrUpdateUser({
        id: id as string,
        first_name: first_name as string,
        last_name: last_name as string,
        image_url: image_url as string,
        email_addresses: email_addresses as unknown as EmailAddress[],
      });
      if (user && eventType === "user.created") {
        try {
          const client = await clerkClient();
          await client.users.updateUserMetadata(id as string, {
            publicMetadata: {
              userMongoId: user._id,
            },
          });
        } catch (error) {
          console.error("Error: Could not update user metadata: ", error);
          throw new Error("Clerk Metadata operation failed"); //propagate error
        }
      }
    } catch (error) {
      console.error("Error: Could not create or update user: ", error);
      return new Response("Error: Could not create or update user", {
        status: 400,
      });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await deleteUser(id as string);
    } catch (error) {
      console.error("Error: Could not delete user: ", error);
      return new Response("Error: Could not delete user", {
        status: 400,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
