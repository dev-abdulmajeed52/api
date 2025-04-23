import { Schema, model } from 'mongoose';


const jobSchema = new Schema({
    title: String,
    description: String,
    requirements: [String],
    salary: String,
    type:  String,
    location: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  });
  export default model('Job', jobSchema);