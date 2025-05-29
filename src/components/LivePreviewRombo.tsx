import React from 'react';
import '../css/LivePreviewRombo.css';

interface LivePreviewRomboProps {
  color: string | null;    // Color dinámico de fondo
  logo: string | null;
  number: number | null;
}

const LivePreviewRombo: React.FC<LivePreviewRomboProps> = ({ color, logo, number }) => {
  return (
    <div className="rombo-container">
      <div className="rombo-outer">
        <div 
          className="rombo-inner"
          style={{ backgroundColor: color || 'white' }}
        >
          {logo && <img src={logo} alt="Logo seleccionado" className="rombo-logo" />}
          {number !== null && <div className="rombo-number">{number}</div>}
        </div>
      </div>
    </div>
  );
};

export default LivePreviewRombo;
