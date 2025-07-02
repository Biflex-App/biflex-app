import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User, { IUser, toUserDto } from '@/models/User';
import { unauthorized, badRequest, ok } from '@/app/api/response';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId, sessionClaims } = getAuth(req);
  if (!userId) {
    return unauthorized();
  }
  const email = sessionClaims?.email;
  const { handle, firstname, lastname, symbol, color } = await req.json();

  try {
    const user = await User.create({
      handle,
      firstname,
      lastname,
      symbol,
      color,
      clerkId: userId,
      email,
    });
    return ok(user, 201);
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return unauthorized();
  }
  const users: IUser[] = await User.find();
  const filteredUsers = users.map((user) => toUserDto(user, userId));
  return ok(filteredUsers);
}
