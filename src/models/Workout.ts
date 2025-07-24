import { isPositiveInt } from "@/lib/utils";
import { Schema, Types } from "mongoose";
import { IExercise } from "./Exercise";
import { WeightProgression, WorkoutExerciseDetail, WorkoutExerciseDetailType } from "@/types/workout";

export interface IWorkoutExercise {
  exercise: Types.ObjectId | IExercise
  sets: number
  details: WorkoutExerciseDetail
  weightProgression: WeightProgression
}

export interface IWorkout {
  name: string
  exercises: IWorkoutExercise[]
  schedule: number[]
}

export interface IRoutine {
  name: string
  startDate: Date
  cycle: number
  workouts: IWorkout[]
}

const workoutSchema: Schema = new Schema({
  exercises: [
    {
      name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [255, 'Name cannot be more than 255 characters'],
        trim: true
      },
      exercise: {
        type: Types.ObjectId,
        required: true,
        ref: 'Exercise',
      },
      sets: {
        type: Number,
        required: true,
        validate: {
          validator: isPositiveInt,
          message: 'Cycle must be a positive integer.'
        }
      },
      details: {
        type: Object,
        required: true,
        validate: {
          validator: function (value: unknown) {
            if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
            const v = value as Record<string, unknown>;
            if (v.type === WorkoutExerciseDetailType.FIXED_DUR) {
              return isPositiveInt(v.duration)
                && Object.keys(v).length === 2
            } else if (v.type === WorkoutExerciseDetailType.DUR) {
              return isPositiveInt(v.min)
                && isPositiveInt(v.max)
                && typeof v.lastSetToFailure === 'boolean'
                && Object.keys(v).length === 4
            } else if (v.type === WorkoutExerciseDetailType.REP) {
              return isPositiveInt(v.min)
                && isPositiveInt(v.max)
                && typeof v.lastSetToFailure === 'boolean'
                && Object.keys(v).length === 4
            }
            return false;
          },
          message: 'Invalid details object for exercise. Must match one of the allowed detail types.'
        }
      },
      weightProgression: {
        type: String,
        enum: Object.values(WeightProgression),
        required: true,
      },
    }
  ],
  schedule: {
    type: [{
      type: Number,
      validate: {
        validator: isPositiveInt,
        message: 'Cycle must be a positive integer.'
      }
    }],
    required: true,
  },
});

export const routineSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [255, 'Name cannot be more than 255 characters'],
    trim: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  cycle: {
    type: Number,
    required: true,
    validate: {
      validator: isPositiveInt,
      message: 'Cycle must be a positive integer.'
    }
  },
  workouts: {
    type: [workoutSchema],
    required: true,
    default: []
  },
});
