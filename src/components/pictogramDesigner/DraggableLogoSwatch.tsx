// src/components/pictogramDesigner/DraggableLogoSwatch.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import type { SymbolOption } from '../../constants/pictogramData';
import { ItemTypes } from './ItemTypes';
import './LogoPicker.css'; // Reutilizamos los estilos de .logo-button o crea uno nuevo

interface DraggableLogoSwatchProps {
  symbolOption: SymbolOption;
}

const DraggableLogoSwatch: React.FC<DraggableLogoSwatchProps> = ({ symbolOption }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.SYMBOL_ICON, // Usamos el nuevo tipo
    item: { symbolOption },    // La información que se transfiere
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // No renderizar nada si no hay path (ej. para "Sin Símbolo")
  if (!symbolOption.path) {
    // O podrías renderizar un botón especial para "Sin Símbolo" si es arrastrable
    return null; 
  }

  return (
    <div
      ref={dragRef as any}
      className="logo-button" // Reutiliza la clase de tu CSS para el estilo base
      title={symbolOption.name}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: 'grab',
      }}
    >
      <img src={symbolOption.path} alt={symbolOption.name} /> {/* El CSS de .logo-button img se encargará del tamaño */}
      {/* Opcional: mostrar el nombre del símbolo */}
      <span className="logo-name-text">{symbolOption.name}</span>
    </div>
  );
};

export default DraggableLogoSwatch;