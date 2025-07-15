/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: `.env.local` })
const axios = require('axios')
const mongoose = require('mongoose')

const basePath = 'https://raw.githubusercontent.com/Biflex-App/free-exercise-db/refs/heads/main'

const getUrl = (path) => {
  return `${basePath}/${path}`
}

const jsonUrl = getUrl('dist/exercises.json')

const fetchExerciseJson = async () => {
  const response = await axios.get(jsonUrl)
  if (typeof response.data === 'string') {
    return JSON.parse(response.data)
  }
  return response.data
}

const MONGODB_URI = process.env.MONGODB_URI

const dbConnect = async () => {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable')
  }
  await mongoose.connect(MONGODB_URI, { bufferCommands: false })
}

const ExerciseSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
})

const Exercise = mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema)

module.exports = {
  fetchExerciseJson,
  dbConnect,
  Exercise
}
