import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { responseHandlerWithContext, UnauthorizedResponse } from '@/app/api/response';
import { getUserById, updateUser } from '@/services/userService';

type ContextType = {
  params: {
    id: string
  }
};

const getUserHandler = async (
  req: NextRequest,
  { params: { id } }: ContextType
) => {
  const { userId } = await auth();
  if (!userId) {
    throw new UnauthorizedResponse();
  }

  await dbConnect();
  return await getUserById(id as string, userId);
};

const updateUserHandler = async (
  req: NextRequest,
  { params: { id } }: ContextType
) => {
  const { userId } = await auth();
  if (!userId) {
    throw new UnauthorizedResponse();
  }

  const { handle, name } = await req.json();
  await dbConnect();
  return await updateUser(
    id,
    { handle, name },
    userId,
  );
};

export const GET = responseHandlerWithContext(getUserHandler)
export const PUT = responseHandlerWithContext(updateUserHandler);
