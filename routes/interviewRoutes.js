import express from 'express';
import { startInterview } from '../controllers/interviewController.js';
import auth from '../middlewares/authMiddleware.js';
import roleCheck from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/start', auth, roleCheck(['applicant']), startInterview);
export default router;