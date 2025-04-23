import { Schema, model } from 'mongoose';

const interviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
    type: { type: String, enum: ['actual', 'mock'] },
    chatHistory: [{ role: String, message: String }],
    createdAt: { type: Date, default: Date.now },
    sessionExpiresAt: {
      type: Date,
      required: true
    }
  });
  export default model('Interview', interviewSchema);