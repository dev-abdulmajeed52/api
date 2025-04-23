import { Schema, model } from 'mongoose';


const applicationSchema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
    applicantId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['applied', 'interviewing', 'rejected', 'hired'], default: 'applied' },
    createdAt: { type: Date, default: Date.now }
  });
  export default model('Application', applicationSchema);