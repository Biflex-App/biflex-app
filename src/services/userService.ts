import User, { IUser } from "@/models/User";

export interface UserCreatePayload {
  handle: string
  name: string
  clerkId: string
  email: string
}

export interface UserUpdatePayload {
  handle?: string
  name?: string
  email?: string
}

export interface UserFilters {
  handle?: string | null
}

export interface UserDto {
  _id: string
  handle: string
  name: string
  email?: string
  createdAt?: string
  updatedAt?: string
}

export const toUserDto = (user: IUser | null, clerkId?: string | null) => {
  if (!user) {
    return null
  }

  const dto: UserDto = {
    _id: user._id.toString(),
    handle: user.handle,
    name: user.name,
  };

  if (!clerkId || user.clerkId !== clerkId) {
    return dto;
  }

  return {
    ...dto,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
};

export const getUserById = async (id: string, clerkId?: string | null) => {
  const user = await User.findById(id);
  return toUserDto(user, clerkId);
}

export const getUsers = async (
  filters?: UserFilters,
  clerkId?: string | null
) => {
  let userQuery = User.find();
  if (filters?.handle) {
    userQuery = userQuery.where('handle', filters.handle);
  }
  const users: IUser[] = await userQuery;
  return users.map((user) => toUserDto(user, clerkId));
};

export const getUserSelf = async (clerkId: string) => {
  const user = await User.findOne({ clerkId });
  return toUserDto(user, clerkId);
};

export const createUser = async (body: UserCreatePayload) => {
  const user = await User.create(body);
  return toUserDto(user, body.clerkId);
};

export const updateUser = async (
  id: string,
  payload: UserUpdatePayload,
  clerkId?: string | null
) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Not found')
  }

  if (payload.handle) {
    user.handle = payload.handle;
  }
  if (payload.name) {
    user.name = payload.name;
  }
  if (payload.email) {
    user.email = payload.email;
  }

  await user.save();
  return toUserDto(user, clerkId);
};
