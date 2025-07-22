import { IDurExerciseDetail, IFixedDurExerciseDetail, IRepExerciseDetail, IRoutine, IWorkout } from "@/models/Workout"
import { ExerciseDto, toExerciseDto } from "./exerciseService"
import { Document, Types } from "mongoose"
import { IExercise } from "@/models/Exercise"

export interface WorkoutExerciseDto {
  exerciseId: string
  exercise?: ExerciseDto
  sets: number
  details: IFixedDurExerciseDetail | IDurExerciseDetail | IRepExerciseDetail
  weightProgression: 'ascending' | 'descending'
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

function isPopulated(exercise: Types.ObjectId | IExercise): exercise is IExercise {
  return exercise instanceof Document;
}

export const toWorkoutDto = (workout: IWorkout) => {
  const dto: WorkoutDto = {
    name: workout.name,
    exercises: workout.exercises.map(we => ({
      exerciseId: isPopulated(we.exercise)
        ? we.exercise._id.toString()
        : we.exercise.toString(),
      exercise: isPopulated(we.exercise)
        ? toExerciseDto(we.exercise)!
        : undefined,
      sets: we.sets,
      details: we.details,
      weightProgression: we.weightProgression,
    })),
    schedule: workout.schedule,
  };

  return dto;
};

export const toRoutineDto = (routine: IRoutine) => {
  const dto: RoutineDto = {
    name: routine.name,
    startDate: routine.startDate.toISOString(),
    cycle: routine.cycle,
    workouts: routine.workouts.map(toWorkoutDto),
  };

  return dto;
};
