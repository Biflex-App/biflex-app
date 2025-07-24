import Exercise, { IExercise } from "@/models/Exercise";
import { ExerciseDto } from "@/types/exercise";
import dbConnect from "@/lib/db";

export const toExerciseDto = (exercise: IExercise | null) => {
  if (!exercise) {
    return null
  }

  const dto: ExerciseDto = {
    _id: exercise._id.toString(),
    jsonId: exercise.jsonId,
    name: exercise.name,
    force: exercise.force,
    level: exercise.level,
    mechanic: exercise.mechanic,
    equipment: exercise.equipment,
    primaryMuscles: exercise.primaryMuscles,
    secondaryMuscles: exercise.secondaryMuscles,
    instructions: exercise.instructions,
    category: exercise.category,
    images: exercise.images,
    createdAt: exercise.createdAt.toISOString(),
    updatedAt: exercise.updatedAt.toISOString(),
  };

  return dto;
};

export const getExercises = async () => {
  await dbConnect();
  const exercises: IExercise[] = await Exercise.find();
  return exercises.map(toExerciseDto);
};
