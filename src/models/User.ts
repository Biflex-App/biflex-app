import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  handle: string; // Unique handle up to 15 characters
  name: string;
  email: string;
  clerkId: string; // Required clerk account ID
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
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
  }
}, {
  timestamps: true,
});

export const toUserDto = (user: IUser, userId: string) => {
  if (user.clerkId === userId) {
    return user.toObject();
  }

  return {
    _id: user._id,
    handle: user.handle,
    name: user.name,
  };
};

// Prevent mongoose from creating the model multiple times
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
