import React from 'react';
import './NumberPicker.css';

interface NumberPickerProps {
  numbers: string[]; // Recibe los números (strings) como prop
  onSelectNumber: (numberValue: string) => void; // Espera un string
  title?: string;
}

const NumberPicker: React.FC<NumberPickerProps> = ({ numbers, onSelectNumber, title }) => {
  return (
    <div className="number-picker-container">
      {title && <h2>{title}</h2>}
      <div className="number-options">
        {numbers.map((numberValue) => (
          <button
            key={numberValue}
            onClick={() => onSelectNumber(numberValue)} // Pasa el string
            className="number-button"
          >
            {numberValue}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberPicker;