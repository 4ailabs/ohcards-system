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
        <div className="w-full max-w-2xl text-center fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#5D4333' }}>
                {allPairsCompleted ? '¡Has completado todos los pares!' : 'Elige un par para explorar'}
            </h2>
            <p className="text-gray-600 mt-0 mb-8">
                {allPairsCompleted ? 'Puedes empezar una nueva sesión.' : 'Selecciona el par de cartas con el que deseas comenzar a trabajar.'}
            </p>
            <div className={`grid grid-cols-1 ${numberOfPairs > 1 ? 'md:grid-cols-3' : 'md:grid-cols-1'} gap-6`}>
                {Array.from({ length: numberOfPairs }).map((_, index) => {
                    const isCompleted = completedPairs.includes(index);
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onSelectPair(index)}
                            disabled={isCompleted}
                            className={`p-8 rounded-lg shadow-lg flex flex-col items-center justify-center transition-all duration-300 ${
                                isCompleted
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed transform'
                                    : 'btn-secondary hover:shadow-xl hover:-translate-y-1'
                            }`}
                        >
                            <span className="font-bold text-xl">Par {index + 1}</span>
                            {isCompleted && <span className="text-sm mt-1">(Completado)</span>}
                        </button>
                    );
                })}
            </div>
            
            <button type="button" onClick={onReset} className="btn-action px-8 py-3 rounded-full font-bold text-lg shadow-lg mt-12">
                {allPairsCompleted || completedPairs.length > 0 ? 'Empezar de Nuevo' : 'Cancelar y Empezar de Nuevo'}
            </button>
        </div>
    );
};

export default PairSelectionScreen;
