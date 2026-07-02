export const analyzeError = async (text: string) => {
  const response = await fetch('/api/analyze-error', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Error analyzing log');
  }

  const data = await response.json();
  return data.analysis as string;
};
