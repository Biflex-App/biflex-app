
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

export interface ExerciseDto {
  _id: string
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
  createdAt: string
  updatedAt: string
}
