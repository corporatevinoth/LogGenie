import React from 'react';

interface FlowCanvasProps {
  nodes: Array<{ id: string; label: string }>;
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({ nodes }) => {
  return (
    <div className="flow-canvas">
      <h2>Log Flow</h2>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>{node.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlowCanvas;
