import express from 'express';
import { createJob, getAllJobs, updateJob, deleteJob } from '../controllers/jobController.js';
import auth from '../middlewares/authMiddleware.js';
import roleCheck from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', auth, roleCheck(['company']), createJob);

router.get('/', getAllJobs);

router.put('/:id', auth, roleCheck(['company']), updateJob);

router.delete('/:id', auth, roleCheck(['company']), deleteJob);

export default router;
