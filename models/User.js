import { Schema, model } from 'mongoose';
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['applicant', 'company', 'admin'], default: 'applicant' }
});
export default model('User', userSchema);