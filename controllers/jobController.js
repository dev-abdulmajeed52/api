const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  const { title, description, requirements, salary, location } = req.body;
  const job = new Job({ title, description, salary, location, requirements, createdBy: req.user.id });
  await job.save();
  res.json(job);
};

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate('createdBy', 'name');
  res.json(jobs);
};