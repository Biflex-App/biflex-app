import { NextResponse } from 'next/server';

export const unauthorized = (message: string = 'Unauthorized') =>
  NextResponse.json({ error: message }, { status: 401 });

export const notFound = (message: string = 'Not found') =>
  NextResponse.json({ error: message }, { status: 404 });

export const badRequest = (message: string = 'Unknown error') =>
  NextResponse.json({ error: message }, { status: 400 });

export const ok = <T>(payload: T, status: number = 200) =>
  NextResponse.json<T>(payload, { status });
