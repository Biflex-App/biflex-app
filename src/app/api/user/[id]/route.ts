import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { responseHandler, RouteHandlerContext, UnauthorizedResponse } from '@/app/api/response';
import { getUserById, updateUser } from '@/services/userService';

export const getUserHandler = async (
  req: NextRequest,
  { params }: RouteHandlerContext
) => {
  const { userId } = getAuth(req);
  if (!userId) {
    throw new UnauthorizedResponse();
  }

  await dbConnect();
  return await getUserById(params.id as string, userId);
}

export const GET = responseHandler(getUserHandler)

export const updateUserHandler = async (
  req: NextRequest,
  { params }: RouteHandlerContext
) => {
  const { userId } = getAuth(req);
  if (!userId) {
    throw new UnauthorizedResponse();
  }

  const { handle, name } = await req.json();
  await dbConnect();
  return await updateUser(
    params.id as string,
    { handle, name },
    userId,
  );
}

export const PUT = responseHandler(updateUserHandler);
