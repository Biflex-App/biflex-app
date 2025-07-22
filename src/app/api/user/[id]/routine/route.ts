import { responseHandlerWithContext, UnauthorizedResponse } from "@/app/api/response";
import { updateUserRoutine } from "@/services/userService";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

type ContextType = {
  params: {
    id: string
  }
};

const updateUserRoutineHandler = async (
  req: NextRequest,
  { params: { id } }: ContextType
) => {
  const { userId } = await auth();
  if (!userId) {
    throw new UnauthorizedResponse();
  }

  const routine = await req.json();
  return await updateUserRoutine(routine, id, userId);
};

export const PUT = responseHandlerWithContext(updateUserRoutineHandler);
