// src/components/pictogramDesigner/DraggableColorSwatch.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import type { ColorOption } from '../../constants/pictogramData';
import { ItemTypes } from './ItemTypes';
// Importa un CSS si tienes estilos específicos para esto, o usa los de ColorPicker.css
// import './DraggableColorSwatch.css';

interface DraggableColorSwatchProps {
  colorOption: ColorOption;
}

const DraggableColorSwatch: React.FC<DraggableColorSwatchProps> = ({ colorOption }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.COLOR_SWATCH,
    item: { colorOption }, // La información que se transfiere
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const isLightColor = colorOption.value === '#FFFFFF' || colorOption.value === '#FFFF00' || colorOption.value === 'lightgrey';

  const swatchStyle: React.CSSProperties = {
    width: '70px', // Ancho de la cartilla
    height: '100px', // Alto de la cartilla
    borderRadius: '8px',
    border: '2px solid #AAA',
    backgroundColor: colorOption.type === 'solid' ? colorOption.value : '#E0E0E0', // Color de fondo
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '5px',
    margin: '5px',
    cursor: 'grab',
    opacity: isDragging ? 0.4 : 1,
    fontSize: '0.75rem',
    color: colorOption.type === 'solid' && isLightColor ? '#333' : '#FFF', // Color del texto
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    userSelect: 'none',
  };

  return (
    <div ref={dragRef as any} style={swatchStyle} title={colorOption.name}>
      {colorOption.name}
    </div>
  );
};

export default DraggableColorSwatch;