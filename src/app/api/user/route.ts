import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User, { IUser } from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId, sessionClaims } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const users: IUser[] = await User.find();
  const filteredUsers = users.map((user) => {
    if (user.clerkId === userId) {
      return user;
    } else {
      return {
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
