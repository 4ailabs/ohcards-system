import React from 'react';

interface PairSelectionScreenProps {
    numberOfPairs: number;
    completedPairs: number[];
    onSelectPair: (index: number) => void;
    onReset: () => void;
}

const PairSelectionScreen: React.FC<PairSelectionScreenProps> = ({ numberOfPairs, completedPairs, onSelectPair, onReset }) => {
    const allPairsCompleted = completedPairs.length === numberOfPairs;

    return (
        <div className="w-full max-w-2xl text-center fade-in p-2 sm:p-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: '#FFFBE6', textShadow: '0 2px 8px rgba(64,46,50,0.18)' }}>
                {allPairsCompleted ? '¡Has completado todos los pares!' : 'Elige un par para explorar'}
            </h2>
            <p className="mt-0 mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: '#5D4333' }}>
                {allPairsCompleted ? 'Puedes empezar una nueva sesión.' : 'Selecciona el par de cartas con el que deseas comenzar a trabajar.'}
            </p>
            <div className={`grid grid-cols-1 ${numberOfPairs > 1 ? 'sm:grid-cols-2 md:grid-cols-3' : 'sm:grid-cols-1'} gap-4 sm:gap-6`}>
                {Array.from({ length: numberOfPairs }).map((_, index) => {
                    const isCompleted = completedPairs.includes(index);
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onSelectPair(index)}
                            disabled={isCompleted}
                            className={`my-2 sm:my-0 p-5 sm:p-6 md:p-8 rounded-lg shadow-lg flex flex-col items-center justify-center transition-all duration-300 touch-manipulation ${
                                isCompleted
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed transform'
                                    : 'btn-secondary hover:shadow-xl hover:-translate-y-1'
                            }`}
                        >
                            <span className="font-bold text-lg sm:text-xl">Par {index + 1}</span>
                            {isCompleted && <span className="text-xs sm:text-sm mt-1">(Completado)</span>}
                        </button>
                    );
                })}
            </div>
            
            <button 
                type="button" 
                onClick={onReset} 
                className="btn-action px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow-lg mt-10 sm:mt-12 w-full sm:w-auto"
            >
                {allPairsCompleted || completedPairs.length > 0 ? 'Empezar de Nuevo' : 'Cancelar y Empezar de Nuevo'}
            </button>
        </div>
    );
};

export default PairSelectionScreen;