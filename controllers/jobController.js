const Job = require('../models/Job');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, requirements, salary,type, location } = req.body;
    const job = new Job({
      title,
      description,
      requirements,
      salary,
      type,
      location,
      createdBy: req.user.id
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create job', details: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { createdBy } = req.query; 
    const filter = createdBy ? { createdBy } : {};
    const jobs = await Job.find(filter).populate('createdBy', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs', details: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const job = await Job.findByIdAndUpdate(id, updates, { new: true });

    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job', details: err.message });
  }
};

// Delete job by ID
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job', details: err.message });
  }
};
