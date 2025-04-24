import Application from '../models/Application.js';
import Interview from '../models/Interview.js';
import { askAI } from '../utils/groqApi.js';
import Job from '../models/Job.js';

const applyJob = async (req, res) => {
  const { jobId, description, requirements, title } = req.body;

  const application = new Application({
    jobId,
    title,
    description,
    requirements,
    applicantId: req.user.id
  });

  await application.save();
  res.json({ msg: 'Applied successfully', application });
};

const startChatInterview = async (req, res) => {
  const { jobId, message } = req.body;

  const job = await Job.findById(jobId).populate('createdBy', 'name');
  if (!job) return res.status(404).json({ msg: 'Job not found' });

  const { description, requirements = [], title } = job;

  const aiPrompt = `
You are an interviewer for a Backend Developer position. The job description is as follows:

"${description}"

The job requirements are: ${Array.isArray(requirements) ? requirements.join(', ') : requirements}

The candidate has said: "${message}"

Please ask a relevant follow-up question based on the job details above.
  `;

  const aiResponse = await askAI(aiPrompt);

  const interview = new Interview({
    userId: req.user.id,
    jobId,
    title,
    description,
    requirements,
    type: 'actual',
    sessionExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15-minute session
    chatHistory: [
      { role: 'applicant', message },
      { role: 'ai', message: aiResponse }
    ]
  });

  await interview.save();

  res.json({
    interview,
    jobDetails: {
      title,
      description,
      requirements
    }
  });
};

const continueChatInterview = async (req, res) => {
  const { jobId, message } = req.body;

  const interview = await Interview.findOne({
    userId: req.user.id,
    jobId,
    type: 'actual',
    sessionExpiresAt: { $gt: new Date() }
  });

  if (!interview) {
    return res.status(404).json({ msg: 'Active interview session not found or expired' });
  }

  interview.chatHistory.push({ role: 'applicant', message });

  const chatContext = interview.chatHistory
    .map((c) => `${c.role === 'applicant' ? 'Candidate' : 'Interviewer'}: ${c.message}`)
    .join('\n');

  const aiPrompt = `
You are an interviewer for a Backend Developer position. Continue the conversation below based on the job information.

Job Title: ${interview.title}
Description: ${interview.description}
Requirements: ${Array.isArray(interview.requirements) ? interview.requirements.join(', ') : interview.requirements}

Chat history so far:
${chatContext}

Please ask a relevant follow-up question based on this exchange.
  `;

  const aiResponse = await askAI(aiPrompt);

  interview.chatHistory.push({ role: 'ai', message: aiResponse });
  await interview.save();

  res.json({ message: aiResponse, interview });
};

const applicantController = {
  applyJob,
  startChatInterview,
  continueChatInterview,
};

export default applicantController;
