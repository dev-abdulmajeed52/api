const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    type: { type: String, enum: ['actual', 'mock'] },
    chatHistory: [{ role: String, message: String }],
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('Interview', interviewSchema);