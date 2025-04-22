const Interview = require('../models/Interview');
const { askAI } = require('../utils/groqApi');

exports.startInterview = async (req, res) => {
  const { type, input } = req.body;
  const aiResponse = await askAI(input);
  const interview = new Interview({
    userId: req.user.id,
    type,
    responses: [aiResponse],
    questions: [input]
  });
  await interview.save();
  res.json(interview);
};
