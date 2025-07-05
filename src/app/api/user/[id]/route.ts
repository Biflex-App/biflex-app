import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User, { toUserDto } from '@/models/User';
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
    return ok(toUserDto(user, userId));
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

  const { handle, name } = await req.json();
  try {
    const user = await User.findByIdAndUpdate(
      params.id,
      { handle, name },
      { new: true, runValidators: true }
    );
    if (!user) return notFound();
    return ok(user);
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : 'Unknown error');
  }
}
