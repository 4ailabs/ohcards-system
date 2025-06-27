import React, { useState } from 'react';
import { IMAGE_CARD_URLS } from '../constants';

interface ImageSelectionScreenProps {
    onSelect: (imageUrls: string[]) => void;
    numberOfPairs: number;
}

const ImageSelectionScreen: React.FC<ImageSelectionScreenProps> = ({ onSelect, numberOfPairs }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleToggleSelect = (url: string) => {
        setSelected(prev => {
            const isSelected = prev.includes(url);
            if (isSelected) {
                return prev.filter(item => item !== url);
            }
            if (prev.length < numberOfPairs) {
                return [...prev, url];
            }
            return prev;
        });
    };
    
    const canConfirm = selected.length === numberOfPairs;

    return (
        <div className="w-full max-w-7xl mx-auto text-center fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#5D4333' }}>
                Selecciona tus {numberOfPairs} {numberOfPairs > 1 ? 'cartas' : 'carta'} de imagen en orden
            </h2>
            <p className="text-gray-600 mt-0 mb-6">
                ({selected.length}/{numberOfPairs}) seleccionadas. El orden en que las elijas determinará su par.
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 max-h-[75vh] overflow-y-auto p-4 rounded-lg bg-black/5">
                {IMAGE_CARD_URLS.map(url => {
                    const selectionIndex = selected.indexOf(url);
                    const isSelected = selectionIndex !== -1;
                    return (
                        <div 
                            key={url} 
                            onClick={() => handleToggleSelect(url)} 
                            className={`relative cursor-pointer aspect-[2/3] card-back rounded-lg shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center p-1 ${
                                isSelected ? 'scale-105 ring-4 ring-offset-2 ring-[#D37A47]' : ''
                            }`}
                            aria-label="Carta de imagen boca abajo"
                            aria-pressed={isSelected}
                        >
                            <div className="w-10/12 h-auto aspect-square rounded-full border-2 border-[#D37A47] flex items-center justify-center">
                                <span className="font-bold text-[#D37A47] text-2xl sm:text-3xl md:text-4xl">OH</span>
                            </div>
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

export default ImageSelectionScreen;