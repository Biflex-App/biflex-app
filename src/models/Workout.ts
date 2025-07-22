import { isPositiveInt } from "@/lib/utils";
import { Schema, Types } from "mongoose";

interface IFixedDurExerciseDetail {
  type: 'fixed-dur'
  duration: number
}

interface IDurExerciseDetail {
  type: 'dur'
  min: number
  max: number
  lastSetToFailure: boolean
}

interface IRepExerciseDetail {
  type: 'rep'
  min: number
  max: number
  lastSetToFailure: boolean
}

export interface IWorkoutExercise {
  exerciseId: Types.ObjectId
  sets: number
  details: IFixedDurExerciseDetail | IDurExerciseDetail | IRepExerciseDetail
  weightProgression: 'ascending' | 'descending'
}

export interface IWorkout {
  _id: Types.ObjectId
  exercises: IWorkoutExercise[]
  schedule: number[]
}

export interface Routine {
  _id: Types.ObjectId
  startDate: Date
  cycle: number
  workouts: IWorkout[]
}

const workoutSchema: Schema = new Schema({
  exercises: [
    {
      exerciseId: {
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
            if (v.type === 'fixed-dur') {
              return isPositiveInt(v.duration)
                && Object.keys(v).length === 2
            } else if (v.type === 'dur') {
              return isPositiveInt(v.min)
                && isPositiveInt(v.max)
                && typeof v.lastSetToFailure === 'boolean'
                && Object.keys(v).length === 4
            } else if (v.type === 'rep') {
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
        enum: ['ascending', 'descending'],
        required: true,
      },
    }
  ],
  schedule: [
    {
      type: Number,
      required: true,
    }
  ],
});

export const routineSchema: Schema = new Schema({
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
  workouts: [workoutSchema],
});
