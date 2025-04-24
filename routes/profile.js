import express from 'express';
import { createOrUpdateProfile, getProfileByUserId } from '../controllers/profileController.js';
import auth from '../middlewares/authMiddleware.js';
import roleCheck from '../middlewares/roleMiddleware.js';


const router = express.Router();

router.post('/', auth, roleCheck(['applicant']), createOrUpdateProfile);
router.get('/:userId', getProfileByUserId);

export default router;
