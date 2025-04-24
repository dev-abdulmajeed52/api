import express from 'express';

const router = express.Router();
import applicantController from '../controllers/applicantController.js';
import auth from '../middlewares/authMiddleware.js';
import roleCheck from '../middlewares/roleMiddleware.js';

router.post('/apply', auth, roleCheck(['applicant']), applicantController.applyJob);
router.post('/chat-interview', auth, roleCheck(['applicant']), applicantController.startChatInterview);
router.post('/interview/continue',  auth, roleCheck(['applicant']), applicantController.continueChatInterview);

export default router;