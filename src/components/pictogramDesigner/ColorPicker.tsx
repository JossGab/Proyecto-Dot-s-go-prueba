// src/components/pictogramDesigner/ColorPicker.tsx
import React from 'react';
import type { ColorOption } from '../../constants/pictogramData';
import DraggableColorSwatch from './DraggableColorSwatch';
import './ColorPicker.css'; // O tu .module.css

interface ColorPickerProps {
  colors: ColorOption[]; // Recibirá solo los colores sólidos
  title?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, title }) => {
  return (
    <div className="color-picker-container">
      {title && <h2>{title}</h2>}
      <div className="color-options"> {/* Este div debe tener flex-direction: row en CSS */}
        {colors.map((colorOpt) => (
          <DraggableColorSwatch key={colorOpt.id} colorOption={colorOpt} />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;