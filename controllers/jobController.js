import Job from '../models/Job.js';

// Create a new job
export async function createJob(req, res) {
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
}

export async function getAllJobs(req, res) {
  try {
    const { createdBy } = req.query; 
    const filter = createdBy ? { createdBy } : {};
    const jobs = await Job.find(filter).populate('createdBy', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs', details: err.message });
  }
}

export async function updateJob(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const job = await Job.findByIdAndUpdate(id, updates, { new: true });

    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job', details: err.message });
  }
}

// Delete job by ID
export async function deleteJob(req, res) {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job', details: err.message });
  }
}
