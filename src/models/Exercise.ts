import { ExerciseCategory, ExerciseEquipment, ExerciseMuscle, ExerciseForce, ExerciseLevel, ExerciseMechanic } from '@/types/exercise';
import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IExercise extends Document {
  _id: Types.ObjectId
  jsonId: string
  name: string
  force: ExerciseForce | null
  level: ExerciseLevel
  mechanic: ExerciseMechanic | null
  equipment: ExerciseEquipment | null
  primaryMuscles: ExerciseMuscle[]
  secondaryMuscles: ExerciseMuscle[]
  instructions: string[]
  category: ExerciseCategory
  images: string[]
  createdAt: Date
  updatedAt: Date
}

const ExerciseSchema: Schema = new Schema(
  {
    jsonId: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9a-zA-Z_-]+$/,
    },
    name: {
      type: String,
      required: true,
    },
    force: {
      type: String,
      enum: [null, ...Object.values(ExerciseForce)],
      default: null,
    },
    level: {
      type: String,
      required: true,
      enum: Object.values(ExerciseLevel),
    },
    mechanic: {
      type: String,
      enum: [null, ...Object.values(ExerciseMechanic)],
      default: null,
    },
    equipment: {
      type: String,
      enum: [null, ...Object.values(ExerciseEquipment)],
      default: null,
    },
    primaryMuscles: [
      {
        type: String,
        enum: Object.values(ExerciseMuscle),
        required: true,
      },
    ],
    secondaryMuscles: [
      {
        type: String,
        enum: Object.values(ExerciseMuscle),
        required: true,
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: Object.values(ExerciseCategory),
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ExerciseModel: Model<IExercise> = mongoose.models.Exercise || mongoose.model<IExercise>('Exercise', ExerciseSchema);
export default ExerciseModel;
