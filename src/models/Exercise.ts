import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export enum ExerciseForce {
  STATIC = 'static',
  PULL = 'pull',
  PUSH = 'push',
}

export enum ExerciseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
}

export enum ExerciseMechanic {
  ISOLATION = 'isolation',
  COMPOUND = 'compound',
}

export enum ExerciseEquipment {
  MEDICINE_BALL = 'medicine ball',
  DUMBBELL = 'dumbbell',
  BODY_ONLY = 'body only',
  BANDS = 'bands',
  KETTLEBELLS = 'kettlebells',
  FOAM_ROLL = 'foam roll',
  CABLE = 'cable',
  MACHINE = 'machine',
  BARBELL = 'barbell',
  EXERCISE_BALL = 'exercise ball',
  EZ_CURL_BAR = 'e-z curl bar',
  OTHER = 'other',
}

export enum ExerciseMuscle {
  ABDOMINALS = 'abdominals',
  ABDUCTORS = 'abductors',
  ADDUCTORS = 'adductors',
  BICEPS = 'biceps',
  CALVES = 'calves',
  CHEST = 'chest',
  FOREARMS = 'forearms',
  GLUTES = 'glutes',
  HAMSTRINGS = 'hamstrings',
  LATS = 'lats',
  LOWER_BACK = 'lower back',
  MIDDLE_BACK = 'middle back',
  NECK = 'neck',
  QUADRICEPS = 'quadriceps',
  SHOULDERS = 'shoulders',
  TRAPS = 'traps',
  TRICEPS = 'triceps',
}

export enum ExerciseCategory {
  POWERLIFTING = 'powerlifting',
  STRENGTH = 'strength',
  STRETCHING = 'stretching',
  CARDIO = 'cardio',
  OLYMPIC_WEIGHTLIFTING = 'olympic weightlifting',
  STRONGMAN = 'strongman',
  PLYOMETRICS = 'plyometrics',
}

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
