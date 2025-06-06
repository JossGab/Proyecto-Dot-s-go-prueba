// src/components/pictogramDesigner/LogoPicker.tsx
import React from 'react';
import type { SymbolOption } from '../../constants/pictogramData';
import DraggableLogoSwatch from './DraggableLogoSwatch'; // Importa el componente arrastrable
import './LogoPicker.css'; // O tu .module.css

interface LogoPickerProps {
  symbols: SymbolOption[];
  // onSelectSymbol ya no es necesario si la selección es solo por DnD
  title?: string;
}

const LogoPicker: React.FC<LogoPickerProps> = ({ symbols, title }) => {
  return (
    // Usa la nueva clase para el contenedor principal que permite el título arriba
    <div className="logo-picker-main-container"> 
      {title && <h2>{title}</h2>}
      <div className="logo-options-wrapper"> {/* Contenedor para las cartillas en fila */}
        {symbols.map((symbolOpt) => (
          // Renderiza el componente arrastrable
          // No renderizar la opción "Sin Símbolo" como arrastrable si no tiene sentido,
          // o manejarla de forma especial. Aquí la filtramos si no tiene path.
          symbolOpt.path ? (
            <DraggableLogoSwatch key={symbolOpt.id} symbolOption={symbolOpt} />
          ) : null 
        ))}
      </div>
    </div>
  );
};

export default LogoPicker;