import React from 'react';
import { useDrop } from 'react-dnd';
import './LivePreviewRombo.css';
import type { ColorOption, SymbolOption } from '../../constants/pictogramData';
import { ItemTypes } from './ItemTypes';
import type { SymbolPosition } from '../../App';

interface LivePreviewRomboProps {
  topColorOption: ColorOption | null;
  bottomColorOption: ColorOption | null;
  symbolOption: SymbolOption | null;
  symbolPosition: SymbolPosition | null;
  number: string | null;
  onTopColorDrop: (colorOption: ColorOption) => void;
  onBottomColorDrop: (colorOption: ColorOption) => void;
  onSymbolDrop: (symbolOption: SymbolOption, position: SymbolPosition) => void;
  onNumberDrop: (numberValue: string) => void;
}

const LivePreviewRombo: React.FC<LivePreviewRomboProps> = ({
  topColorOption,
  bottomColorOption,
  symbolOption,
  symbolPosition,
  number,
  onTopColorDrop,
  onBottomColorDrop,
  onSymbolDrop,
  onNumberDrop,
}) => {
  // Drop para colores o símbolo en parte superior
  const [{ isOverTop, canDropTop, draggedItemTypeTop }, dropTopRef] = useDrop(() => ({
    accept: [ItemTypes.COLOR_SWATCH, ItemTypes.SYMBOL_ICON],
    drop: (item: any, monitor) => {
      const type = monitor.getItemType();
      if (type === ItemTypes.COLOR_SWATCH && item.colorOption) {
        onTopColorDrop(item.colorOption);
      } else if (type === ItemTypes.SYMBOL_ICON && item.symbolOption) {
        onSymbolDrop(item.symbolOption, 'top');
      }
    },
    collect: (monitor) => ({
      isOverTop: !!monitor.isOver(),
      canDropTop: !!monitor.canDrop(),
      draggedItemTypeTop: monitor.getItemType(),
    }),
  }));

  // Drop para colores o símbolo en parte inferior
  const [{ isOverBottom, canDropBottom, draggedItemTypeBottom }, dropBottomRef] = useDrop(() => ({
    accept: [ItemTypes.COLOR_SWATCH, ItemTypes.SYMBOL_ICON],
    drop: (item: any, monitor) => {
      const type = monitor.getItemType();
      if (type === ItemTypes.COLOR_SWATCH && item.colorOption) {
        onBottomColorDrop(item.colorOption);
      } else if (type === ItemTypes.SYMBOL_ICON && item.symbolOption) {
        onSymbolDrop(item.symbolOption, 'bottom');
      }
    },
    collect: (monitor) => ({
      isOverBottom: !!monitor.isOver(),
      canDropBottom: !!monitor.canDrop(),
      draggedItemTypeBottom: monitor.getItemType(),
    }),
  }));

  // Drop para números (en el rombo completo)
  const [{ isOverNumberArea, canDropNumber }, numberDropAreaRef] = useDrop(() => ({
    accept: ItemTypes.NUMBER_BADGE,
    drop: (item: { numberValue: string }) => onNumberDrop(item.numberValue),
    collect: (monitor) => ({
      isOverNumberArea: !!monitor.isOver(),
      canDropNumber: !!monitor.canDrop(),
    }),
  }));

  // --- Estilos base del rombo ---
  const topColor = topColorOption?.value || 'lightgrey';
  const bottomColor = bottomColorOption?.value || 'lightgrey';

  const romboInnerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    background: `linear-gradient(to bottom, ${topColor} 0%, ${topColor} 50%, ${bottomColor} 50%, ${bottomColor} 100%)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    border: '2px solid transparent',
    transition: 'box-shadow 0.3s ease',
  };

  if (!topColorOption && !bottomColorOption) {
    romboInnerStyles.backgroundColor = 'lightgrey';
  }

  if (
    (topColorOption?.value === '#FFFFFF' && bottomColorOption?.value === '#FFFFFF') ||
    (topColorOption?.value === '#FFFFFF' && !bottomColorOption) ||
    (bottomColorOption?.value === '#FFFFFF' && !topColorOption)
  ) {
    romboInnerStyles.border = '2px solid #000000';
  }

  if (isOverNumberArea && canDropNumber) {
    romboInnerStyles.boxShadow = '0 0 10px 5px #2196F3';
  }

  const dropZoneBase: React.CSSProperties = {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'outline 0.2s ease',
  };

  const topDropZoneStyles: React.CSSProperties = {
    ...dropZoneBase,
    outlineOffset: '-2px',
    outline: canDropTop && isOverTop
      ? `3px dashed ${draggedItemTypeTop === ItemTypes.COLOR_SWATCH ? 'orange' : 'green'}`
      : canDropTop
      ? `2px dashed ${draggedItemTypeTop === ItemTypes.COLOR_SWATCH ? 'grey' : 'lightgreen'}`
      : 'none',
  };

  const bottomDropZoneStyles: React.CSSProperties = {
    ...dropZoneBase,
    outlineOffset: '-2px',
    outline: canDropBottom && isOverBottom
      ? `3px dashed ${draggedItemTypeBottom === ItemTypes.COLOR_SWATCH ? 'orange' : 'green'}`
      : canDropBottom
      ? `2px dashed ${draggedItemTypeBottom === ItemTypes.COLOR_SWATCH ? 'grey' : 'lightgreen'}`
      : 'none',
  };

  // --- Símbolo ---
  const logoStyles: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    width: '50%',
    maxHeight: '40%',
    objectFit: 'contain',
    pointerEvents: 'none',
    zIndex: 10,
    transition: 'top 0.3s ease, bottom 0.3s ease, transform 0.3s ease',
  };

  if (symbolPosition === 'top') {
    logoStyles.top = '25%';
    logoStyles.transform = 'translate(-50%, -50%)';
  } else if (symbolPosition === 'bottom') {
    logoStyles.bottom = '25%';
    logoStyles.transform = 'translate(-50%, 50%)';
  } else if (symbolOption) {
    logoStyles.top = '50%';
    logoStyles.transform = 'translate(-50%, -50%)';
  }

  // --- Número ---
  const numberTextColor = ['#000000', '#DC2626', '#16A34A', '#2563EB'].includes(bottomColorOption?.value || '')
    ? '#FFFFFF'
    : '#000000';

  const numberStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '8%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 'bold',
    fontSize: '1.3em',
    color: numberTextColor,
    textShadow: '1px 1px 2px rgba(0,0,0,0.25)',
    zIndex: 10,
  };

  const isEmpty = !topColorOption && !bottomColorOption && !symbolOption && !number;

  return (
    <div className="rombo-container">
      <div className="rombo-outer">
        <div ref={numberDropAreaRef as any} className="rombo-inner" style={romboInnerStyles}>
          <div ref={dropTopRef as any} style={topDropZoneStyles}>
            {isEmpty && !isOverTop && !isOverBottom && (
              <span className="rombo-drop-hint">Arrastra<br />colores<br />aquí</span>
            )}
          </div>
          <div ref={dropBottomRef as any} style={bottomDropZoneStyles}></div>

          {symbolOption?.path && (
            <img src={symbolOption.path} alt={symbolOption.name} className="rombo-logo" style={logoStyles} />
          )}
          {number && number !== 'Sin Número' && (
            <div className="rombo-number" style={numberStyles}>{number}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePreviewRombo;
