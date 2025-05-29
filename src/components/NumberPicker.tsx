import React from 'react';
import '../css/NumberPicker.css';

interface Props {
  onSelect: (number: number) => void;
}

const NumberPicker: React.FC<Props> = ({ onSelect }) => {
  const numbers = [1, 2, 3, 4, 5, 6];

  return (
    <div className="number-picker-container">
      <h2>Elige un número:</h2>
      {numbers.map((num) => (
        <button
          key={num}
          onClick={() => onSelect(num)}
          className="number-button"
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default NumberPicker;
