import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  handle: string; // Unique handle up to 15 characters
  firstname: string;
  lastname: string;
  email: string;
  clerkId: string; // Required clerk account ID
  symbol: string; // Single emoji or alphabet character
  color: string; // Hex color code
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
  firstname: {
    type: String,
    required: [true, 'Please provide a first name'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Please provide a last name'],
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
  symbol: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        // Check if it's a single emoji or single alphabet character
        const isEmoji = /^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]$/u;
        const isSingleChar = /^[a-zA-Z]$/;
        return isEmoji.test(v) || isSingleChar.test(v);
      },
      message: 'Symbol must be a single emoji or single alphabet character'
    }
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        // Hex color validation (with or without #)
        return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message: 'Color must be a valid hex color code'
    }
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
    firstname: user.firstname,
    lastname: user.lastname,
    symbol: user.symbol,
    color: user.color,
  };
};

// Prevent mongoose from creating the model multiple times
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
