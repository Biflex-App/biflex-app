import { responseHandler } from "../../response";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import { getUserSelf } from "@/services/userService";

const getUserSelfHandler = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  await dbConnect();
  return await getUserSelf(userId);
};

export const GET = responseHandler(getUserSelfHandler);
