const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// GET all jobs (public)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name').sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST new job (employer only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'employer')
    return res.status(403).json({ msg: 'Only employers can post jobs' });

  const { title, company, location, description, type } = req.body;
  try {
    const job = new Job({ title, company, location, description, type, postedBy: req.user.id });
    await job.save();
    res.json(job);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// APPLY to a job (student only)
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.applicants.includes(req.user.id))
      return res.status(400).json({ msg: 'Already applied' });

    job.applicants.push(req.user.id);
    await job.save();
    res.json({ msg: 'Applied successfully!' });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE job (employer only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    if (job.postedBy.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Not authorized' });

    await job.deleteOne();
    res.json({ msg: 'Job deleted' });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
