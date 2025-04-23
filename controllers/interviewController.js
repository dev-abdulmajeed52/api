import Interview from '../models/Interview.js';
import { askAI } from '../utils/groqApi.js';

export async function startInterview(req, res) {
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
}
