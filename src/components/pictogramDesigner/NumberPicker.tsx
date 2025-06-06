// src/components/pictogramDesigner/NumberPicker.tsx
import React from 'react';
import DraggableNumberSwatch from './DraggableNumberSwatch'; // ✨ Importa el nuevo componente arrastrable
import './NumberPicker.css'; // Tu archivo CSS donde está .number-picker-main-container, etc.

interface NumberPickerProps {
  numbers: string[]; // Recibe la lista de números disponibles
  title?: string;
  // La prop 'onSelectNumber' ya no es necesaria si la selección es solo por drag and drop
}

const NumberPicker: React.FC<NumberPickerProps> = ({ numbers, title }) => {
  return (
    <div className="number-picker-main-container"> {/* Contenedor principal con título arriba */}
      {title && <h2>{title}</h2>}
      <div className="number-options-wrapper">   {/* Contenedor para las cartillas en fila */}
        {numbers.map((numValue) => (
          // ✨ Renderiza el componente arrastrable para cada número
          <DraggableNumberSwatch 
            key={numValue} 
            numberValue={numValue} 
          />
        ))}
      </div>
    </div>
  );
};

export default NumberPicker;