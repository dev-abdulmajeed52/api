// controllers/applicantController.js

const Application = require('../models/Application');
const Interview = require('../models/Interview');
const { askAI } = require('../utils/groqApi');
const Job = require('../models/Job');

const applyJob = async (req, res) => {
  const { jobId } = req.body;
  const application = new Application({ jobId, applicantId: req.user.id });
  await application.save();
  res.json({ msg: 'Applied successfully', application });
};

const startChatInterview = async (req, res) => {
  const { jobId, message } = req.body;
  
  const job = await Job.findById(jobId).populate('createdBy', 'name');
  if (!job) return res.status(404).json({ msg: 'Job not found' });

  const aiResponse = await askAI(message);  // This can be your AI question-answer logic

  const interview = new Interview({
    userId: req.user.id,
    jobId,
    type: 'actual',
    chatHistory: [
      { role: 'applicant', message },
      { role: 'ai', message: aiResponse }
    ]
  });

  await interview.save();
  res.json(interview);
};



module.exports = {
  applyJob,
  startChatInterview,
};
