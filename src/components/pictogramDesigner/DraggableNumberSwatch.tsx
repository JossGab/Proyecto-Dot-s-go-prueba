// src/components/pictogramDesigner/DraggableNumberSwatch.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
// Reutilizaremos los estilos de NumberPicker.css para la apariencia de "cartilla"
// Asegúrate de que la ruta a tu CSS de NumberPicker sea correcta
import './NumberPicker.css'; 

interface DraggableNumberSwatchProps {
  numberValue: string; // Los números son strings (ej: "5.1", "Sin Número")
}

const DraggableNumberSwatch: React.FC<DraggableNumberSwatchProps> = ({ numberValue }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.NUMBER_BADGE, // Define el tipo de ítem que se está arrastrando
    item: { numberValue },      // La información que se transfiere cuando se suelta
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef as any} // Aplica el ref para hacerlo arrastrable
      className="number-button" // Reutiliza la clase CSS de tus botones de número para el estilo
      title={`Número ${numberValue}`}
      style={{
        opacity: isDragging ? 0.4 : 1, // Efecto visual mientras se arrastra
        cursor: 'grab',               // Cambia el cursor para indicar que es arrastrable
        // Los demás estilos (width, height, font-size, etc.) vendrán de .number-button en NumberPicker.css
      }}
    >
      {numberValue}
    </div>
  );
};

export default DraggableNumberSwatch;