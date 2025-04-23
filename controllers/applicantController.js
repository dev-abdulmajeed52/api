import Application from '../models/Application.js';
import Interview from '../models/Interview.js';
import { askAI } from '../utils/groqApi.js';
import Job from '../models/Job.js';

const applyJob = async (req, res) => {
  const { jobId,description,requirements,title } = req.body;
  const application = new Application({ jobId,title,description,requirements, applicantId: req.user.id });
  await application.save();
  res.json({ msg: 'Applied successfully', application });
};

const startChatInterview = async (req, res) => {
  const { jobId, message } = req.body;

  const job = await Job.findById(jobId).populate('createdBy', 'name');
  if (!job) return res.status(404).json({ msg: 'Job not found' });

  const { description, requirements, title } = job;

  const aiPrompt = `
    You are an interviewer for a Backend Developer position. The job description is as follows:
    ${description}

    The job requirements are:
    ${requirements.join(', ')}

    The candidate has said: "${message}"

    Please ask relevant questions based on the job description and requirements.
  `;

  const aiResponse = await askAI(aiPrompt);

  const interview = new Interview({
    userId: req.user.id,
    jobId,
    title,
    description,
    requirements,
    type: 'actual',
    sessionExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
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
  const { interviewId } = req.params;
  const { message } = req.body;

  const interview = await InterviewfindById(interviewId);
  if (!interview) return res.status(404).json({ msg: 'Interview not found' });

  // Get the job details for context
  const job = await Job.findById(interview.jobId);
  if (!job) return res.status(404).json({ msg: 'Job not found' });

  const aiPrompt = `
    You are continuing a technical interview for a frontend developer role.

    Job Description:
    ${job.description}

    Requirements:
    ${job.requirements.join(', ')}

    Previous Chat History:
    ${interview.chatHistory.map(c => `${c.role === 'ai' ? 'AI' : 'Applicant'}: ${c.message}`).join('\n')}

    New message from the applicant:
    "${message}"

    Respond with a relevant interview question or follow-up.
  `;

  const aiResponse = await askAI(aiPrompt);

  interview.chatHistory.push(
    { role: 'applicant', message },
    { role: 'ai', message: aiResponse }
  );

  await interview.save();

  res.json(interview);
};




const applicantController = {
  applyJob,
  startChatInterview,
  continueChatInterview,
};

export default applicantController;
