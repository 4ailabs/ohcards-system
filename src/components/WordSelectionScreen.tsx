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
            {/* Header mejorado */}
            <div className="container-glass mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                    Selecciona tus {numberOfPairs} {numberOfPairs > 1 ? 'cartas' : 'carta'} de palabra
                </h2>
                <p className="text-sm sm:text-base text-secondary mb-2">
                    La 1ª palabra irá con la 1ª imagen, y así sucesivamente
                </p>
                {/* Progress indicator mejorado */}
                <div className="mt-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-lg font-bold text-yellow-700">
                            {selected.length} / {numberOfPairs}
                        </span>
                        <span className="text-sm text-secondary">seleccionadas</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="h-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full transition-all duration-300"
                            style={{ width: `${(selected.length / numberOfPairs) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 sm:gap-3 md:gap-4 max-h-[60vh] sm:max-h-[70vh] md:max-h-[75vh] overflow-y-auto p-2 sm:p-4 rounded-lg bg-black/5">
                {WORD_CARD_DATA.map(word => {
                    const selectionIndex = selected.indexOf(word);
                    const isSelected = selectionIndex !== -1;
                    return (
                        <button
                            key={word}
                            onClick={() => handleToggleSelect(word)}
                            className={`relative cursor-pointer aspect-[2/3] rounded-lg shadow-md flex items-center justify-center p-1 touch-manipulation transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                                isSelected ? 'scale-105 ring-2 sm:ring-4 ring-offset-1 sm:ring-offset-2 ring-[#D37A47]' : ''
                            }`}
                            aria-label={isSelected ? `Carta de palabra ${selectionIndex + 1}, presiona para deseleccionar` : "Carta de palabra boca abajo, presiona para seleccionar"}
                            aria-pressed={isSelected}
                            type="button"
                        >
                            <WordCardBack />
                            {isSelected && (
                                <>
                                    {/* Badge de número de selección */}
                                    <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-base shadow-lg ring-2 ring-white animate-bounce">
                                        {selectionIndex + 1}
                                    </div>
                                    {/* Indicador visual de selección */}
                                    <div className="absolute inset-0 bg-yellow-500/10 rounded-lg pointer-events-none" />
                                </>
                            )}
                        </button>
                    );
                })}
            </div>
            {canConfirm && (
                <button
                    type="button"
                    onClick={() => onSelect(selected)}
                    className="btn btn-primary btn-lg mt-4 sm:mt-6 animate-pulse w-full sm:w-auto"
                    aria-label={`Confirmar selección de ${numberOfPairs} ${numberOfPairs > 1 ? 'palabras' : 'palabra'}`}
                >
                    Confirmar Selección
                </button>
            )}
        </div>
    );
};

export default WordSelectionScreen;