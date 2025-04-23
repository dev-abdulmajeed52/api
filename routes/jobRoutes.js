const router = require('express').Router();
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

const auth = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');

router.post('/', auth, roleCheck(['company']), createJob);

router.get('/', getAllJobs);

router.put('/:id', auth, roleCheck(['company']), updateJob);

router.delete('/:id', auth, roleCheck(['company']), deleteJob);

module.exports = router;
