import React, { useState } from 'react';

const NodeAddModal = ({ onAddNode, closeModal }) => {
  const [userLabel, setUserLabel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleAddNode = () => {
    onAddNode(userLabel, selectedColor);
    setUserLabel('');
    setSelectedColor('');
  };

  return (
    <div className="modal">
      <label>
        Enter Data for the new node:
        <input type="text" value={userLabel} onChange={(e) => setUserLabel(e.target.value)} />
      </label>

      <label>
        Select a color for the new node:
        <div style={{ display: 'flex', gap: '10px',justifyContent:'center'}}>
          <div>
            <input
              type="radio"
              id="red"
              value="red"
              checked={selectedColor === 'red'}
              onChange={() => setSelectedColor('red')}
            />
            <label htmlFor="red" style={{ color: 'red' }}>Red</label>
          </div>

          <div>
            <input
              type="radio"
              id="green"
              value="green"
              checked={selectedColor === 'green'}
              onChange={() => setSelectedColor('green')}
            />
            <label htmlFor="green" style={{ color: 'green' }}>Green</label>
          </div>

          <div>
            <input
              type="radio"
              id="blue"
              value="blue"
              checked={selectedColor === 'blue'}
              onChange={() => setSelectedColor('blue')}
            />
            <label htmlFor="blue" style={{ color: 'blue' }}>Blue</label>
          </div>
        </div>
      </label>
      <button onClick={handleAddNode}>Add Node</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default NodeAddModal;
