import fetch from 'node-fetch';

export const getAIAnalysis = async (text: string) => {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    throw new Error('Missing LLM_API_KEY');
  }

  const response = await fetch('https://api.example.com/v1/analyze', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: text }),
  });

  if (!response.ok) {
    throw new Error('LLM provider rejected request');
  }

  const data = await response.json();
  return data.analysis ?? 'No analysis returned';
};
