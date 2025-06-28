import React, { useState } from 'react';
import { WORD_CARD_DATA } from '../constants';

interface WordSelectionScreenProps {
    onSelect: (words: string[]) => void;
    numberOfPairs: number;
}

// Componente para el reverso de carta de palabra (marrón)
const WordCardBack: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 300 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', borderRadius: '1rem', border: '4px solid #C2A24A', background: '#fff' }}>
    <defs>
      <pattern id="scribbleBrown" patternUnits="userSpaceOnUse" width="40" height="40">
        <path d="M5 20 Q15 5 35 20 Q25 35 5 20 Z" stroke="#C2A24A" strokeWidth="2" fill="none"/>
        <path d="M20 5 Q35 15 20 35 Q5 25 20 5 Z" stroke="#C2A24A" strokeWidth="1.5" fill="none"/>
      </pattern>
    </defs>
    <rect width="300" height="420" rx="24" fill="url(#scribbleBrown)" />
    <ellipse cx="150" cy="210" rx="44" ry="22" fill="#C2A24A" fillOpacity="0.18"/>
    <text x="150" y="218" textAnchor="middle" fontSize="40" fontWeight="bold" fontFamily="Arial" fill="#A67C2E">OH</text>
  </svg>
);

const WordSelectionScreen: React.FC<WordSelectionScreenProps> = ({ onSelect, numberOfPairs }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleToggleSelect = (word: string) => {
        setSelected(prev => {
            const isSelected = prev.includes(word);
            if (isSelected) {
                return prev.filter(item => item !== word);
            }
            if (prev.length < numberOfPairs) {
                return [...prev, word];
            }
            return prev;
        });
    };

    const canConfirm = selected.length === numberOfPairs;

    return (
        <div className="w-full max-w-7xl mx-auto text-center fade-in p-2 sm:p-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: '#FFFBE6', textShadow: '0 2px 8px rgba(64,46,50,0.18)' }}>
                Selecciona tus {numberOfPairs} {numberOfPairs > 1 ? 'cartas' : 'carta'} de palabra en orden
            </h2>
             <p className="mt-0 mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: '#5D4333' }}>
                ({selected.length}/{numberOfPairs}) seleccionadas. La 1ª palabra irá con la 1ª imagen, y así sucesivamente.
             </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 sm:gap-3 md:gap-4 max-h-[60vh] sm:max-h-[70vh] md:max-h-[75vh] overflow-y-auto p-2 sm:p-4 rounded-lg bg-black/5">
                {WORD_CARD_DATA.map(word => {
                    const selectionIndex = selected.indexOf(word);
                    const isSelected = selectionIndex !== -1;
                    return (
                        <div 
                            key={word} 
                            onClick={() => handleToggleSelect(word)} 
                            className={`relative cursor-pointer aspect-[2/3] rounded-lg shadow-md flex items-center justify-center p-1 touch-manipulation transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                                isSelected ? 'scale-105 ring-2 sm:ring-4 ring-offset-1 sm:ring-offset-2 ring-[#D37A47]' : ''
                            }`}
                            aria-label="Carta de palabra boca abajo"
                            aria-pressed={isSelected}
                        >
                            <WordCardBack />
                            {isSelected && (
                                <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center text-[#402E32] font-bold text-xs sm:text-base shadow-lg ring-1 sm:ring-2 ring-white">
                                    {selectionIndex + 1}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {canConfirm && (
                <button
                    type="button"
                    onClick={() => onSelect(selected)}
                    className="btn-action px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow-lg mt-4 sm:mt-6 animate-pulse w-full sm:w-auto"
                >
                    Confirmar Selección
                </button>
            )}
        </div>
    );
};

export default WordSelectionScreen;