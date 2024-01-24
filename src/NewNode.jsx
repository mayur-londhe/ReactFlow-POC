// NewNode.jsx
import React, { useState } from 'react';

const NewNode = ({ id, position, onAdd, onCancel, onUpdate }) => {
  const [label, setLabel] = useState(`Node ${id}`);

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        border: '1px solid #ddd',
        background: '#fff',
        padding: '8px',
        zIndex: 999,
      }}
    >
      <label>
        Label:
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
      </label>
      <button onClick={() => onAdd()}>Add Node</button>
      <button onClick={() => onUpdate(label)}>Update Node</button>
      <button onClick={() => onCancel()}>Cancel</button>
    </div>
  );
};

export default NewNode;
