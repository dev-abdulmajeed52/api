const router = require('express').Router();
const { createJob, getAllJobs } = require('../controllers/jobController');
const auth = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');

router.post('/', auth, roleCheck(['company']), createJob);
router.get('/', getAllJobs);
module.exports = router;