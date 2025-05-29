import { useState } from 'react';
import ColorPicker from './components/ColorPicker';
import LogoPicker from './components/LogoPicker';
import NumberPicker from './components/NumberPicker';
import LivePreviewRombo from './components/LivePreviewRombo';

import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [color, setColor] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [number, setNumber] = useState<number | null>(null);

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setStep(2);
  };

  const handleLogoSelect = (selectedLogo: string) => {
    setLogo(selectedLogo);
    setStep(3);
  };

  const handleNumberSelect = (selectedNumber: number) => {
    setNumber(selectedNumber);
    setStep(4);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Juego de Pictogramas</h1>

      <LivePreviewRombo color={color} logo={logo} number={number} />

      {step === 1 && <ColorPicker onSelect={handleColorSelect} />}

      {step === 2 && color && <LogoPicker onSelect={handleLogoSelect} />}

      {step === 3 && logo && <NumberPicker onSelect={handleNumberSelect} />}
    </div>
  );
}

export default App;
