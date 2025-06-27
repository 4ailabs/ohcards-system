import React, { useState } from 'react';
import { IMAGE_CARD_URLS } from '../constants';
import { CardBack } from './CardDisplay';

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

    // Componente para el reverso de carta de imagen (verde)
    const ImageCardBack: React.FC = () => (
        <svg width="100%" height="100%" viewBox="0 0 300 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', borderRadius: '1rem', border: '4px solid #A5C96A', background: '#fff' }}>
            <defs>
                <pattern id="scribbleGreen" patternUnits="userSpaceOnUse" width="40" height="40">
                    <path d="M5 20 Q15 5 35 20 Q25 35 5 20 Z" stroke="#A5C96A" strokeWidth="2" fill="none"/>
                    <path d="M20 5 Q35 15 20 35 Q5 25 20 5 Z" stroke="#A5C96A" strokeWidth="1.5" fill="none"/>
                </pattern>
            </defs>
            <rect width="300" height="420" rx="24" fill="url(#scribbleGreen)" />
            <ellipse cx="150" cy="210" rx="44" ry="22" fill="#A5C96A" fillOpacity="0.18"/>
            <text x="150" y="218" textAnchor="middle" fontSize="40" fontWeight="bold" fontFamily="Arial" fill="#7A9D3A">OH</text>
        </svg>
    );

    return (
        <div className="w-full max-w-7xl mx-auto text-center fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#FFFBE6', textShadow: '0 2px 8px rgba(64,46,50,0.18)' }}>
                Selecciona tus {numberOfPairs} {numberOfPairs > 1 ? 'cartas' : 'carta'} de imagen en orden
            </h2>
            <p className="mt-0 mb-6" style={{ color: '#5D4333' }}>
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
                            className={`relative cursor-pointer aspect-[2/3] rounded-lg shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center p-1 ${
                                isSelected ? 'scale-105 ring-4 ring-offset-2 ring-[#D37A47]' : ''
                            }`}
                            aria-label="Carta de imagen boca abajo"
                            aria-pressed={isSelected}
                        >
                            <ImageCardBack />
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