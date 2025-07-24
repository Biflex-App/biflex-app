import { NotFoundResponse, UnauthorizedResponse } from "@/app/api/response";
import User, { IUser } from "@/models/User";
import Exercise from "@/models/Exercise";
import dbConnect from "@/lib/db";
import { Types } from "mongoose";
import { toRoutineDto } from "./workoutService";
import { UserDto, UserRoutineDto } from "@/types/user";

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
    routines: user.routines?.map(ur => ({
      routine: toRoutineDto(ur.routine),
      enabled: ur.enabled,
    })),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
};

export const getUserById = async (id: string, clerkId?: string | null) => {
  await dbConnect();
  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundResponse();
  }

  return toUserDto(user, clerkId);
}

export const getUsers = async (
  filters?: UserFilters,
  clerkId?: string | null
) => {
  await dbConnect();
  let userQuery = User.find();
  if (filters?.handle) {
    userQuery = userQuery.where('handle', filters.handle);
  }
  const users: IUser[] = await userQuery;
  return users.map((user) => toUserDto(user, clerkId));
};

export const getUserSelf = async (clerkId: string) => {
  await dbConnect();
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
  await dbConnect();
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundResponse();
  }
  if (user.clerkId !== clerkId) {
    throw new UnauthorizedResponse();
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

export const updateUserRoutine = async (
  routines: UserRoutineDto[],
  userId: string,
  clerkId: string
) => {
  await dbConnect();
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundResponse();
  }
  if (user.clerkId !== clerkId) {
    throw new UnauthorizedResponse();
  }

  const exerciseIds = new Set<string>();
  const convertedRoutines = routines.map(ur => {
    const convertedWorkouts = ur.routine.workouts.map(workout => {
      const convertedExercises = workout.exercises.map(exercise => {
        exerciseIds.add(exercise.exerciseId);
        return {
          exercise: new Types.ObjectId(exercise.exerciseId),
          sets: exercise.sets,
          details: exercise.details,
          weightProgression: exercise.weightProgression,
        };
      });
      return {
        name: workout.name,
        exercises: convertedExercises,
        schedule: workout.schedule,
      };
    });
    return {
      routine: {
        name: ur.routine.name,
        startDate: new Date(ur.routine.startDate),
        cycle: ur.routine.cycle,
        workouts: convertedWorkouts,
      },
      enabled: ur.enabled,
    };
  });

  const existingExercises = await Exercise.find({
    _id: { $in: Array.from(exerciseIds).map(id => new Types.ObjectId(id)) }
  });

  if (existingExercises.length !== exerciseIds.size) {
    throw new NotFoundResponse('One or more exercises do not exist');
  }

  user.routines = convertedRoutines;

  await user.save();
  return toUserDto(user, clerkId);
};
