import { ExerciseDto } from "./exercise"

export enum WorkoutExerciseDetailType {
  FIXED_DUR = 'fixed-dur',
  DUR = 'dur',
  REP = 'rep',
}

export enum WeightProgression {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

interface FixedDurExerciseDetail {
  type: WorkoutExerciseDetailType.FIXED_DUR
  duration: number
}

interface DurExerciseDetail {
  type: WorkoutExerciseDetailType.DUR
  min: number
  max: number
  lastSetToFailure: boolean
}

interface RepExerciseDetail {
  type: WorkoutExerciseDetailType.REP
  min: number
  max: number
  lastSetToFailure: boolean
}

export type WorkoutExerciseDetail = FixedDurExerciseDetail | DurExerciseDetail | RepExerciseDetail;

export interface WorkoutExerciseDto {
  exerciseId: string
  exercise?: ExerciseDto
  sets: number
  details: WorkoutExerciseDetail
  weightProgression: WeightProgression
}

export interface WorkoutDto {
  name: string
  exercises: WorkoutExerciseDto[]
  schedule: number[]
}

export interface RoutineDto {
  name: string
  startDate: string
  cycle: number
  workouts: WorkoutDto[]
}
