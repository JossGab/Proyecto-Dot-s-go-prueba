import React from 'react';
import '../css/LogoPicker.css';

// Importar los pictogramas individualmente
import Baterias from '../assets/images/pictograms/baterias.svg';
import Botella from '../assets/images/pictograms/botella.svg';
import Calavera from '../assets/images/pictograms/calavera.svg';
import Corrosivo from '../assets/images/pictograms/corrosivo.svg';
// Agrega más según necesites...

const pictograms = [
  { name: 'Baterías', src: Baterias },
  { name: 'Botella', src: Botella },
  { name: 'Calavera', src: Calavera },
  { name: 'Corrosivo', src: Corrosivo },
  // ...
];

interface LogoPickerProps {
  onSelect: (logoSrc: string) => void;
}

const LogoPicker: React.FC<LogoPickerProps> = ({ onSelect }) => {
  return (
    <div className="logo-picker-container">
      {pictograms.map((picto) => (
        <button
          key={picto.name}
          className="logo-button"
          onClick={() => onSelect(picto.src)}
          title={picto.name}
        >
          <img src={picto.src} alt={picto.name} width="30" height="30" />
        </button>
      ))}
    </div>
  );
};

export default LogoPicker;
