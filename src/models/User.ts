import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { IRoutine, routineSchema } from './Workout';

export interface IUser extends Document {
  _id: Types.ObjectId
  handle: string // Unique handle up to 15 characters
  name: string
  email: string
  clerkId: string // Required clerk account ID
  routines: {
    routine: IRoutine;
    enabled: boolean;
  }[];
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, 'Handle must have at least 3 characters'],
    maxlength: [15, 'Handle cannot be more than 15 characters'],
    validate: {
      validator: function(v: string) {
        // Twitter handle standard: alphanumeric and underscores only
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: 'Handle can only contain letters, numbers, and underscores'
    }
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minLength: [3, 'Name must have at least 3 characters'],
    maxlength: [255, 'Name cannot be more than 255 characters'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true
  },
  clerkId: {
    type: String,
    required: [true, 'Please provide a Clerk ID'],
    trim: true
  },
  routines: {
    type: [
      {
        routine: routineSchema,
        enabled: {
          type: Boolean,
          default: true,
        },
      }
    ],
    default: [],
  },
}, {
  timestamps: true,
});

// Prevent mongoose from creating the model multiple times
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default UserModel;
