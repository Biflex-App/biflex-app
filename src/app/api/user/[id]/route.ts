import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { unauthorized, notFound, badRequest, ok } from '@/app/api/response';
import { getUserById, updateUser } from '@/services/userService';

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
    const userDto = await getUserById(params.id, userId);
    return ok(userDto);
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
    const userDto = await updateUser(
      params.id,
      { handle, name },
      userId,
    )
    if (!userDto) return notFound();
    return ok(userDto);
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : 'Unknown error');
  }
}
