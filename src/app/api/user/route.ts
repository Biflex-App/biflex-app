import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { UnauthorizedResponse, createOkResponse, responseHandler } from '@/app/api/response';
import { createUser, getUsers } from '@/services/userService';

const createUserHandler = async (req: NextRequest) => {
  const { userId, sessionClaims } = getAuth(req);
  if (!userId || !sessionClaims || !sessionClaims.email) {
    throw new UnauthorizedResponse();
  }

  await dbConnect();
  const email = sessionClaims.email as string;
  const { handle, name } = await req.json();
  const user = await createUser({
    handle,
    name,
    email,
    clerkId: userId
  });
  return createOkResponse(user, 201);
}

const listUsersHandler = async (req: NextRequest) => {
  const { userId } = getAuth(req);
  if (!userId) {
    throw new UnauthorizedResponse();
  }

  await dbConnect();
  const handle = req.nextUrl.searchParams.get('handle');
  return await getUsers(
    { ...(handle ? { handle } : null) },
    userId,
  );
}

export const POST = responseHandler(createUserHandler);
export const GET = responseHandler(listUsersHandler);
