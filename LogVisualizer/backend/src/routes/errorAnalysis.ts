import { Router } from 'express';
import { getAIAnalysis } from '../services/llmProvider';

const router = Router();

router.post('/', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text payload' });
  }

  try {
    const analysis = await getAIAnalysis(text);
    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing text', error);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

export default router;
