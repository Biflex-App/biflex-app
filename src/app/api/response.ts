import { Error as mgError } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const createOkResponse = (body: unknown, status: number = 200) =>
  NextResponse.json(body, { status })

const createErrorResponse = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export class ResponseError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }

  toResponse() {
    return createErrorResponse(this.message, this.status)
  }
}

export class UnauthorizedResponse extends ResponseError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
  }
}

export class NotFoundResponse extends ResponseError {
  constructor(message: string = 'Not found') {
    super(message, 404)
  }
}

export class BadRequestResponse extends ResponseError {
  constructor(message: string) {
    super(message, 400)
  }
}

const handleError = (error: unknown) => {
  if (error instanceof ResponseError) {
    return error.toResponse();
  }

  // Mongoose specific errors
  if (error instanceof mgError.DocumentNotFoundError) {
    return createErrorResponse('Resource not found', 404);
  }

  if (error instanceof mgError.ValidationError) {
    const validationErrors = Object.values(error.errors)
      .map((err) => err.message);
    return createErrorResponse(
      `Validation failed: ${validationErrors.join(', ')}`,
      400
    );
  }

  if (error instanceof mgError.CastError) {
    const castError = error as mgError.CastError;
    return createErrorResponse(
      `Invalid ${castError.path}: ${castError.value}`,
      400
    );
  }

  // Handle MongoDB server errors (including duplicate key errors)
  if (error && typeof error === 'object' && 'code' in error) {
    const mongoError = error as { code: number; keyPattern?: Record<string, unknown> };

    // Handle duplicate key errors (E11000)
    if (mongoError.code === 11000) {
      const field = Object.keys(mongoError.keyPattern || {})[0];
      return createErrorResponse(
        `${field} already exists`,
        409
      );
    }
  }

  // Generic error handling
  console.error('Unhandled error:', error);
  return createErrorResponse(
    'Internal server error',
    500
  );
};

export type RouteHandler<T> = (req: NextRequest) => T | Promise<T>;

export const responseHandler = <T>(handler: RouteHandler<T>) => {
  const handledRoute = async (req: NextRequest) => {
    try {
      const response = await handler(req);
      if (response instanceof NextResponse) {
        return response
      }
      return createOkResponse(response)
    }
    catch (error) {
      return handleError(error);
    }
  }

  return handledRoute
};

export type RouteHandlerContext<U> = {
  params: Awaited<U>
};

export type RouteHandlerWithContext<T, U> =
  (req: NextRequest, context: RouteHandlerContext<U>) => T | Promise<T>;

export const responseHandlerWithContext = <T, U>(handler: RouteHandlerWithContext<T, U>) => {
  const handledRoute = async (
    req: NextRequest,
    context: {
      params: Promise<U>
    },
  ) => {
    try {
      const params  = await context.params
      const response = await handler(req, { params });
      if (response instanceof NextResponse) {
        return response
      }
      return createOkResponse(response)
    }
    catch (error) {
      return handleError(error);
    }
  }

  return handledRoute
};
