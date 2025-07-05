import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { unauthorized, badRequest, ok } from '@/app/api/response';
import { createUser, getUsers } from '@/services/userService';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId, sessionClaims } = getAuth(req);
  if (!userId || !sessionClaims || !sessionClaims.email) {
    return unauthorized();
  }

  const email = sessionClaims.email as string;
  const { handle, name } = await req.json();
  try {
    const user = await createUser({
      handle,
      name,
      email,
      clerkId: userId
    });
    return ok(user, 201);
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function GET(
  req: NextRequest,
  { searchParams }: { searchParams: URLSearchParams }
) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return unauthorized();
  }

  const handle = searchParams.get('handle');
  // let userQuery = User.find();
  // if (handle) {
  //   userQuery = userQuery.where('handle', handle);
  // }

  const users = await getUsers(
    { ...(handle ? { handle } : null) },
    userId,
  );
  return ok(users);
}
