import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  experience: [
    {
      title: String,
      company: String,
      location: String,
      from: Date,
      to: Date,
      current: Boolean,
      description: String
    }
  ],
  skills: [String],
  createdAt: { type: Date, default: Date.now }
});

export default model('Profile', profileSchema);
