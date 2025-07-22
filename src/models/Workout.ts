import { isPositiveInt } from "@/lib/utils";
import { Schema, Types } from "mongoose";
import { IExercise } from "./Exercise";

export interface IFixedDurExerciseDetail {
  type: 'fixed-dur'
  duration: number
}

export interface IDurExerciseDetail {
  type: 'dur'
  min: number
  max: number
  lastSetToFailure: boolean
}

export interface IRepExerciseDetail {
  type: 'rep'
  min: number
  max: number
  lastSetToFailure: boolean
}

export interface IWorkoutExercise {
  exercise: Types.ObjectId | IExercise
  sets: number
  details: IFixedDurExerciseDetail | IDurExerciseDetail | IRepExerciseDetail
  weightProgression: 'ascending' | 'descending'
}

export interface IWorkout {
  _id: Types.ObjectId
  name: string
  exercises: IWorkoutExercise[]
  schedule: number[]
}

export interface IRoutine {
  _id: Types.ObjectId
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
