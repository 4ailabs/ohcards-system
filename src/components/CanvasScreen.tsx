import React, { useState, useEffect } from 'react';
import { ImageCardBack, WordCardBack } from './CardDisplay';

interface CanvasCard {
    id: number;
    type: 'image' | 'word';
    content: string;
    isFlipped: boolean;
    isSelected: boolean;
}

interface CanvasScreenProps {
    chosenImages: string[];
    chosenWords: string[];
    numberOfPairs: number;
    onBack: () => void;
    onReset: () => void;
    onStartProcess?: () => void;
}

const CanvasScreen: React.FC<CanvasScreenProps> = ({
    chosenImages,
    chosenWords,
    numberOfPairs,
    onBack,
    onReset,
    onStartProcess
}) => {
    const [cards, setCards] = useState<CanvasCard[]>([]);

    useEffect(() => {
        console.log('CanvasScreen useEffect triggered:', { numberOfPairs, chosenImages, chosenWords });
        const canvasCards: CanvasCard[] = [];
        for (let i = 0; i < numberOfPairs; i++) {
            canvasCards.push({
                id: i * 2,
                type: 'image',
                content: chosenImages[i],
                isFlipped: false,
                isSelected: false
            });
            canvasCards.push({
                id: i * 2 + 1,
                type: 'word',
                content: chosenWords[i],
                isFlipped: false,
                isSelected: false
            });
        }
        console.log('Created cards:', canvasCards);
        setCards(canvasCards);
    }, [numberOfPairs, chosenImages, chosenWords]);

    const handleCardClick = (cardId: number) => {
        setCards(prev => prev.map(card => 
            card.id === cardId 
                ? { ...card, isFlipped: !card.isFlipped }
                : card
        ));
    };

    const handleCardSelect = (cardId: number) => {
        setCards(prev => prev.map(card => 
            card.id === cardId 
                ? { ...card, isSelected: !card.isSelected }
                : card
        ));
    };

    const handlePairSelect = (pairIndex: number) => {
        const imageCardId = pairIndex * 2;
        const wordCardId = pairIndex * 2 + 1;
        
        setCards(prev => prev.map(card => 
            card.id === imageCardId || card.id === wordCardId
                ? { ...card, isSelected: !card.isSelected }
                : card
        ));
    };

    const renderCard = (card: CanvasCard) => {
        const pairNumber = Math.floor(card.id / 2) + 1;
        const isImage = card.type === 'image';

        return (
            <div 
                key={card.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                    card.isFlipped ? 'shadow-xl' : 'shadow-lg'
                } ${card.isSelected ? 'ring-4 ring-blue-500' : ''}`}
                onClick={() => handleCardClick(card.id)}
            >
                {/* Número de identificación */}
                <div className={`absolute -top-2 -left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold z-10 ${
                    card.isFlipped ? 'bg-green-500' : 'bg-yellow-500'
                } text-white shadow-lg`}>
                    {pairNumber}
                </div>
                
                {/* Tipo de carta */}
                <div className={`absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold z-10 ${
                    card.isFlipped ? 'bg-green-700' : 'bg-blue-500'
                } text-white shadow-lg`}>
                    {isImage ? 'I' : 'P'}
                </div>

                {/* Carta */}
                <div className={`w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 lg:w-36 lg:h-44 bg-white rounded-lg overflow-hidden border-2 ${
                    isImage ? 'border-green-500' : 'border-amber-700'
                }`}>
                    {card.isFlipped ? (
                        isImage ? (
                            <img 
                                src={card.content} 
                                alt={`Imagen ${pairNumber}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-2 sm:p-3">
                                <div className="text-center">
                                    <div className="text-xs sm:text-sm font-bold text-gray-800 mb-1">
                                        Palabra {pairNumber}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 leading-tight">
                                        {card.content}
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (
                        isImage ? <ImageCardBack /> : <WordCardBack />
                    )}
                </div>

                {/* Botón de selección */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCardSelect(card.id);
                    }}
                    className={`absolute -bottom-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
                        card.isSelected ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                >
                    {card.isSelected ? '✓' : '+'}
                </button>
            </div>
        );
    };

    const renderPairSelector = () => {
        return (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                    Seleccionar por Pares
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                    {Array.from({ length: numberOfPairs }, (_, i) => {
                        const imageCard = cards.find(c => c.id === i * 2);
                        const wordCard = cards.find(c => c.id === i * 2 + 1);
                        const isPairSelected = imageCard?.isSelected && wordCard?.isSelected;
                        
                        return (
                            <button
                                key={i}
                                onClick={() => handlePairSelect(i)}
                                className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                                    isPairSelected 
                                        ? 'bg-blue-600 text-white shadow-lg' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Par {i + 1}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const selectedCount = cards.filter(card => card.isSelected).length;
    const totalCards = cards.length;

    return (
        <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                    Lienzo de Cartas
                </h1>
                <p className="text-sm sm:text-base text-gray-600 text-center mb-4">
                    Toca las cartas para voltearlas y ver su contenido
                </p>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Total de cartas: {totalCards} (Pares: {numberOfPairs})
                    </p>
                    <p className="text-sm text-blue-600 font-medium">
                        Seleccionadas: {selectedCount} de {totalCards}
                    </p>
                    {selectedCount === totalCards && (
                        <p className="text-sm text-green-600 font-bold animate-pulse">
                            ¡Todas las cartas seleccionadas!
                        </p>
                    )}
                </div>
            </div>

            {/* Selector de pares */}
            {renderPairSelector()}

            {/* Grid de cartas */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <div className={`grid gap-3 sm:gap-4 justify-items-center ${
                    numberOfPairs <= 2 ? 'grid-cols-2 sm:grid-cols-4' :
                    numberOfPairs <= 3 ? 'grid-cols-3 sm:grid-cols-6' :
                    numberOfPairs <= 4 ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8' :
                    numberOfPairs <= 5 ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10' :
                    'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12'
                }`}>
                    {cards.map(renderCard)}
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                    onClick={onBack}
                    className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                >
                    Volver
                </button>
                {onStartProcess && (
                    <button
                        onClick={onStartProcess}
                        className="btn-action px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                    >
                        Iniciar Proceso Completo
                    </button>
                )}
                <button
                    onClick={onReset}
                    className="btn-action px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                >
                    Reiniciar Todo
                </button>
            </div>
        </div>
    );
};

export default CanvasScreen; 