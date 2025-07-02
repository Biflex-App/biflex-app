import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { unauthorized, notFound, badRequest, ok } from '@/app/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return unauthorized();
  }
  try {
    const user = await User.findById(params.id);
    if (!user) return notFound();
    if (user.clerkId === userId) {
      return ok(user);
    } else {
      return ok({
        _id: user._id,
        handle: user.handle,
        firstname: user.firstname,
        lastname: user.lastname,
        symbol: user.symbol,
        color: user.color,
      });
    }
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return unauthorized();
  }
  const { handle, firstname, lastname, symbol, color } = await req.json();
  try {
    const user = await User.findByIdAndUpdate(
      params.id,
      { handle, firstname, lastname, symbol, color },
      { new: true, runValidators: true }
    );
    if (!user) return notFound();
    return ok(user);
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : 'Unknown error');
  }
}
