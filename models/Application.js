const mongoose = require('mongoose');


const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['applied', 'interviewing', 'rejected', 'hired'], default: 'applied' },
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('Application', applicationSchema);