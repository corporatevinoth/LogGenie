import React from 'react';

interface Props {
  onSubmit: (input: string) => void;
}

const InputPanel: React.FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = React.useState('');

  return (
    <div className="input-panel">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste logs or error messages here..."
      />
      <button onClick={() => onSubmit(value)}>Analyze</button>
    </div>
  );
};

export default InputPanel;
