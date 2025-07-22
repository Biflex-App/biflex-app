import { Types } from "mongoose";

interface IFixedDurExerciseDetail {
  type: 'fixed-dur'
  duration: number
}

interface IDurExerciseDetail {
  type: 'fixed-dur'
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
