import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IExercise extends Document {
  _id: Types.ObjectId
  jsonId: string
  name: string
  force: 'static' | 'pull' | 'push' | null
  level: 'beginner' | 'intermediate' | 'expert'
  mechanic: 'isolation' | 'compound' | null
  equipment: 'medicine ball' | 'dumbbell' | 'body only' | 'bands' | 'kettlebells' | 'foam roll' | 'cable' | 'machine' | 'barbell' | 'exercise ball' | 'e-z curl bar' | 'other' | null
  primaryMuscles: (
    | 'abdominals'
    | 'abductors'
    | 'adductors'
    | 'biceps'
    | 'calves'
    | 'chest'
    | 'forearms'
    | 'glutes'
    | 'hamstrings'
    | 'lats'
    | 'lower back'
    | 'middle back'
    | 'neck'
    | 'quadriceps'
    | 'shoulders'
    | 'traps'
    | 'triceps'
  )[]
  secondaryMuscles: (
    | 'abdominals'
    | 'abductors'
    | 'adductors'
    | 'biceps'
    | 'calves'
    | 'chest'
    | 'forearms'
    | 'glutes'
    | 'hamstrings'
    | 'lats'
    | 'lower back'
    | 'middle back'
    | 'neck'
    | 'quadriceps'
    | 'shoulders'
    | 'traps'
    | 'triceps'
  )[]
  instructions: string[]
  category: 'powerlifting' | 'strength' | 'stretching' | 'cardio' | 'olympic weightlifting' | 'strongman' | 'plyometrics'
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
      enum: [null, 'static', 'pull', 'push'],
      default: null,
    },
    level: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'expert'],
    },
    mechanic: {
      type: String,
      enum: ['isolation', 'compound', null],
      default: null,
    },
    equipment: {
      type: String,
      enum: [
        null,
        'medicine ball',
        'dumbbell',
        'body only',
        'bands',
        'kettlebells',
        'foam roll',
        'cable',
        'machine',
        'barbell',
        'exercise ball',
        'e-z curl bar',
        'other',
      ],
      default: null,
    },
    primaryMuscles: [
      {
        type: String,
        enum: [
          'abdominals',
          'abductors',
          'adductors',
          'biceps',
          'calves',
          'chest',
          'forearms',
          'glutes',
          'hamstrings',
          'lats',
          'lower back',
          'middle back',
          'neck',
          'quadriceps',
          'shoulders',
          'traps',
          'triceps',
        ],
        required: true,
      },
    ],
    secondaryMuscles: [
      {
        type: String,
        enum: [
          'abdominals',
          'abductors',
          'adductors',
          'biceps',
          'calves',
          'chest',
          'forearms',
          'glutes',
          'hamstrings',
          'lats',
          'lower back',
          'middle back',
          'neck',
          'quadriceps',
          'shoulders',
          'traps',
          'triceps',
        ],
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
      enum: [
        'powerlifting',
        'strength',
        'stretching',
        'cardio',
        'olympic weightlifting',
        'strongman',
        'plyometrics',
      ],
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
