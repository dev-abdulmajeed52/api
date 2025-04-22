const router = require('express').Router();
const { startInterview } = require('../controllers/interviewController');
const auth = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');

router.post('/start', auth, roleCheck(['applicant']), startInterview);
module.exports = router;