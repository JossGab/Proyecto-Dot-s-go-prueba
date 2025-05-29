import React from 'react';
import '../css/ColorPicker.css';

interface Props {
  onSelect: (color: string) => void;
}

const colors = ['red', 'blue', 'green', 'purple'];

const ColorPicker: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="color-picker-container">
      <h2>Elige un color:</h2>
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onSelect(color)}
          className="color-button"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
