import React from 'react';
import InputPanel from './components/InputPanel';
import FlowCanvas from './components/FlowCanvas';
import AIAnalyzer from './components/AIAnalyzer';
import { parseLog } from './utils/logParser';
import { analyzeError } from './utils/aiClient';

const App: React.FC = () => {
  const [nodes, setNodes] = React.useState<Array<{ id: string; label: string }>>([]);
  const [analysis, setAnalysis] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (input: string) => {
    setNodes(parseLog(input));
    setLoading(true);
    try {
      const result = await analyzeError(input);
      setAnalysis(result);
    } catch (error) {
      setAnalysis('Failed to analyze error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>LogVisualizer</h1>
      <InputPanel onSubmit={handleSubmit} />
      <FlowCanvas nodes={nodes} />
      <AIAnalyzer analysis={analysis} loading={loading} />
    </div>
  );
};

export default App;
