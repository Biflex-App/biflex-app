import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { UNAUTHORIZED_ERROR, NOT_FOUND_ERROR, BAD_REQUEST_ERROR } from '@/app/api/error';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(...UNAUTHORIZED_ERROR);
  }
  try {
    const user = await User.findById(params.id);
    if (!user) return NextResponse.json(...NOT_FOUND_ERROR);
    if (user.clerkId === userId) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({
        _id: user._id,
        handle: user.handle,
        firstname: user.firstname,
        lastname: user.lastname,
        symbol: user.symbol,
        color: user.color,
      });
    }
  } catch (error) {
    const badRequest = BAD_REQUEST_ERROR(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(...badRequest);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(...UNAUTHORIZED_ERROR);
  }
  const { handle, firstname, lastname, symbol, color } = await req.json();
  try {
    const user = await User.findByIdAndUpdate(
      params.id,
      { handle, firstname, lastname, symbol, color },
      { new: true, runValidators: true }
    );
    if (!user) return NextResponse.json(...NOT_FOUND_ERROR);
    return NextResponse.json(user);
  } catch (error) {
    const badRequest = BAD_REQUEST_ERROR(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(...badRequest);
  }
}
