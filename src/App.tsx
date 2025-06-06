import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';

import {
  availableColors,
  availableSymbols,
  availableNumbers,
  type ColorOption,
  type SymbolOption,
} from './constants/pictogramData';

import LivePreviewRombo from './components/pictogramDesigner/LivePreviewRombo';
import ColorPicker from './components/pictogramDesigner/ColorPicker';
import LogoPicker from './components/pictogramDesigner/LogoPicker';
import NumberPicker from './components/pictogramDesigner/NumberPicker';

export type SymbolPosition = 'top' | 'bottom' | 'center';

function AppContent() {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedTopColor, setSelectedTopColor] = useState<ColorOption | null>(null);
  const [selectedBottomColor, setSelectedBottomColor] = useState<ColorOption | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolOption | null>(null);
  const [selectedSymbolPosition, setSelectedSymbolPosition] = useState<SymbolPosition | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);

  const solidColors = availableColors.filter((color) => color.type === 'solid');

  // --- Handlers DnD ---
  const handleTopColorDrop = (color: ColorOption) => {
    if (color.type !== 'solid') {
      alert("Por favor, arrastra un color sólido para la parte superior.");
      return;
    }
    setSelectedTopColor(color);
  };

  const handleBottomColorDrop = (color: ColorOption) => {
    if (color.type !== 'solid') {
      alert("Por favor, arrastra un color sólido para la parte inferior.");
      return;
    }
    setSelectedBottomColor(color);
  };

  const handleSymbolDrop = (symbol: SymbolOption, position: SymbolPosition) => {
    setSelectedSymbol(symbol);
    setSelectedSymbolPosition(position);
    console.log(`Símbolo ${symbol.name} soltado en posición: ${position}`);
    setCurrentStep((prev) => (prev === 2 ? 3 : prev));
  };

  // --- Cambio automático de paso cuando hay color sup/inf ---
  useEffect(() => {
    if (selectedTopColor && selectedBottomColor && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [selectedTopColor, selectedBottomColor, currentStep]);

  // --- Reset general ---

  return (
    <div className="appContainer">
      <header className="appHeader">
        <h1>Diseñador de Pictogramas de Seguridad</h1>
      </header>

      <main className="designerLayout">
        <section className="previewSection">
          <LivePreviewRombo
            topColorOption={selectedTopColor}
            bottomColorOption={selectedBottomColor}
            symbolOption={selectedSymbol}
            symbolPosition={selectedSymbolPosition}
            number={selectedNumber}
            onTopColorDrop={handleTopColorDrop}
            onBottomColorDrop={handleBottomColorDrop}
            onSymbolDrop={handleSymbolDrop}
            onNumberDrop={(num) => {
              setSelectedNumber(num === 'Sin Número' ? null : num);
              setCurrentStep((prev) => (prev === 3 ? 4 : prev));
            }}
          />
        </section>

        <section className="controlsSection">
          {currentStep === 1 && (
            <ColorPicker colors={solidColors} title="Paso 1: Arrastra Colores (Superior / Inferior)" />
          )}

          {currentStep === 2 && (
            <>

              <LogoPicker symbols={availableSymbols} title="Paso 2: Arrastra un Símbolo (Arriba/Abajo)" />
            </>
          )}

          {currentStep === 3 && (
            <>
              <NumberPicker
                numbers={availableNumbers}
                title="Paso 3: Elige Número"
              />
            </>
          )}

          {currentStep === 4 && (
            <div className="summarySection">
              <h2>¡Pictograma Configurado!</h2>
              <p><strong>Color Superior:</strong> {selectedTopColor?.name || 'No seleccionado'}</p>
              <p><strong>Color Inferior:</strong> {selectedBottomColor?.name || 'No seleccionado'}</p>
              <p><strong>Símbolo:</strong> {selectedSymbol?.name || 'No seleccionado'} ({selectedSymbolPosition || 'N/A'})</p>
              <p><strong>Número:</strong> {selectedNumber || 'Ninguno'}</p>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppContent />
    </DndProvider>
  );
}
