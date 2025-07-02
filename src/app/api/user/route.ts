import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User, { IUser } from '@/models/User';
import { UNAUTHORIZED_ERROR, BAD_REQUEST_ERROR } from '@/app/api/error';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId, sessionClaims } = getAuth(req);
  if (!userId) {
    return NextResponse.json(...UNAUTHORIZED_ERROR);
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
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    const badRequest = BAD_REQUEST_ERROR(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(...badRequest);
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(...UNAUTHORIZED_ERROR);
  }
  const users: IUser[] = await User.find();
  const filteredUsers = users.map((user) => {
    if (user.clerkId === userId) {
      return user;
    } else {
      return {
        _id: user._id,
        handle: user.handle,
        firstname: user.firstname,
        lastname: user.lastname,
        symbol: user.symbol,
        color: user.color,
      };
    }
  });
  return NextResponse.json(filteredUsers);
}
