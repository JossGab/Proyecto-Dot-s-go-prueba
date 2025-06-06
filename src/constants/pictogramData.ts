// src/constants/pictogramData.ts

// --- Importa tus iconos SVG ---
// ¡IMPORTANTE! Reemplaza con los nombres reales y rutas correctas de tus archivos.
import bateriasIcon from '../assets/images/pictograms/baterias.svg';
import botellaIcon from '../assets/images/pictograms/botella.svg';
import calaveraIcon from '../assets/images/pictograms/calavera.svg';
import corrosivoIcon from '../assets/images/pictograms/corrosivo.svg';
import explosivoIcon from '../assets/images/pictograms/explosivo.svg';
import fuegoIcon from '../assets/images/pictograms/fuego.svg';
import oxidanteIcon from '../assets/images/pictograms/oxidante.svg';
import radioactivoIcon from '../assets/images/pictograms/radioactivo.svg';
import riesgoBiologicoIcon from '../assets/images/pictograms/riesgo-biologico.svg';
// ... importa TODOS los demás iconos que tengas.

// --- Tipos ---
export interface ColorOption {
  id: string;
  name: string;
  type: 'solid' | 'pattern'; // 'solid' para colores planos, 'pattern' para más complejos
  value: string; // Código Hex para 'solid', o un identificador para 'pattern'
  borderColor?: string;
  primaryColor?: string;  // Usado para patrones
  secondaryColor?: string;// Usado para patrones
}

export interface SymbolOption {
  id: string;
  name: string;
  path: string | null; // Ruta al SVG importado, o null si no hay símbolo
  defaultSymbolColor?: string; // 'black' o 'white'
}

// --- Colores de Fondo Disponibles ---
export const availableColors: ColorOption[] = [
  // Colores Sólidos (estos son los que usaremos para arrastrar a las mitades)
  { id: 'orange_solid', name: 'Naranja', type: 'solid', value: '#FF9900' },
  { id: 'red_solid', name: 'Rojo', type: 'solid', value: '#DC2626' },
  { id: 'green_solid', name: 'Verde', type: 'solid', value: '#16A34A' },
  { id: 'white_solid', name: 'Blanco', type: 'solid', value: '#FFFFFF', borderColor: '#000000' },
  { id: 'yellow_solid', name: 'Amarillo', type: 'solid', value: '#FACC15' },
  { id: 'blue_solid', name: 'Azul', type: 'solid', value: '#2563EB' },
  { id: 'black_solid', name: 'Negro', type: 'solid', value: '#000000' },

  // Ejemplos de Patrones (no los usaremos directamente para arrastrar a las mitades,
  // pero los dejo por si quieres un selector de patrones predefinidos en el futuro)
  { id: 'red_white_stripes', name: 'Rayas Rojas/Blancas', type: 'pattern', value: 'redWhiteStripesPattern', primaryColor: '#DC2626', secondaryColor: '#FFFFFF' },
  // ... puedes añadir más patrones predefinidos si lo deseas.
];

// --- Símbolos Disponibles ---
export const availableSymbols: SymbolOption[] = [
  { id: 'explosivo', name: 'Explosión', path: explosivoIcon, defaultSymbolColor: 'black' },
  { id: 'fuego', name: 'Llama', path: fuegoIcon, defaultSymbolColor: 'black' },
  { id: 'oxidante', name: 'Oxidante', path: oxidanteIcon, defaultSymbolColor: 'black' },
  { id: 'botella', name: 'Botella de Gas', path: botellaIcon, defaultSymbolColor: 'black' },
  { id: 'calavera', name: 'Calavera (Tóxico)', path: calaveraIcon, defaultSymbolColor: 'black' },
  { id: 'corrosivo', name: 'Corrosión', path: corrosivoIcon, defaultSymbolColor: 'black' },
  { id: 'radioactivo', name: 'Radiactividad', path: radioactivoIcon, defaultSymbolColor: 'black' },
  { id: 'riesgo_biologico', name: 'Riesgo Biológico', path: riesgoBiologicoIcon, defaultSymbolColor: 'black' },
  { id: 'baterias', name: 'Baterías', path: bateriasIcon, defaultSymbolColor: 'black' },
  { id: 'no_symbol', name: 'Sin Símbolo', path: null },
];

// --- Números de Clase/División Disponibles ---
export const availableNumbers: string[] = ['1', 'A 1', '2', '2.1', '2.2', '2.3', '3', '4', '4.1', '4.2', '4.3', '5.1', '5.2', '6', '6.1', '6.2', '7', '8', '9', 'Sin Número'];