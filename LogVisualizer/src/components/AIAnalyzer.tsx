import React from 'react';

interface AIAnalyzerProps {
  analysis: string;
  loading: boolean;
}

const AIAnalyzer: React.FC<AIAnalyzerProps> = ({ analysis, loading }) => {
  return (
    <div className="ai-analyzer">
      <h2>AI Error Analysis</h2>
      {loading ? <p>Analyzing error...</p> : <pre>{analysis || 'Submit logs to get AI insights.'}</pre>}
    </div>
  );
};

export default AIAnalyzer;
