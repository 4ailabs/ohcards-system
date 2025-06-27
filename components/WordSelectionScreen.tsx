import React, { useState } from 'react';
import { WORD_CARD_DATA } from '../constants';

interface WordSelectionScreenProps {
    onSelect: (words: string[]) => void;
    numberOfPairs: number;
}

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
        <div className="w-full max-w-7xl mx-auto text-center fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#5D4333' }}>
                Selecciona tus {numberOfPairs} {numberOfPairs > 1 ? 'cartas' : 'carta'} de palabra en orden
            </h2>
             <p className="text-gray-600 mt-0 mb-6">
                ({selected.length}/{numberOfPairs}) seleccionadas. La 1ª palabra irá con la 1ª imagen, y así sucesivamente.
             </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 max-h-[75vh] overflow-y-auto p-4 rounded-lg bg-black/5">
                {WORD_CARD_DATA.map(word => {
                    const selectionIndex = selected.indexOf(word);
                    const isSelected = selectionIndex !== -1;
                    return (
                        <div 
                            key={word} 
                            onClick={() => handleToggleSelect(word)} 
                            className={`relative cursor-pointer aspect-[2/3] card-back rounded-lg shadow-md flex items-center justify-center p-2 transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                                isSelected ? 'scale-105 ring-4 ring-offset-2 ring-[#D37A47]' : ''
                            }`}
                            aria-label="Carta de palabra boca abajo"
                            aria-pressed={isSelected}
                        >
                            <span className="text-white text-center font-semibold text-sm md:text-base">Palabra</span>
                            {isSelected && (
                                <div className="absolute top-1.5 right-1.5 w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#402E32] font-bold text-base shadow-lg ring-2 ring-white">
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
                    className="btn-action px-8 py-3 rounded-full font-bold text-lg shadow-lg mt-6 animate-pulse"
                >
                    Confirmar Selección
                </button>
            )}
        </div>
    );
};

export default WordSelectionScreen;