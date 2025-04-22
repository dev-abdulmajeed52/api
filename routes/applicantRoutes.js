const router = require('express').Router();
const { applyJob, startChatInterview } = require('../controllers/applicantController');
const auth = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');

router.post('/apply', auth, roleCheck(['applicant']), applyJob);
router.post('/chat-interview', auth, roleCheck(['applicant']), startChatInterview);
module.exports = router;