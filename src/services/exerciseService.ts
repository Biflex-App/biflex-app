import Exercise, { IExercise } from "@/models/Exercise";
import dbConnect from "@/lib/db";

export const getExercises = async () => {
  await dbConnect();
  const exercises: IExercise[] = await Exercise.find();
  return exercises;
};
