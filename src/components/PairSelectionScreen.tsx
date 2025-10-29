import React from 'react';

interface PairSelectionScreenProps {
    numberOfPairs: number;
    completedPairs: number[];
    onSelectPair: (pairIndex: number) => void;
    onReset: () => void;
}

const PairSelectionScreen: React.FC<PairSelectionScreenProps> = ({
    numberOfPairs,
    completedPairs,
    onSelectPair,
    onReset
}) => {
    const allPairsCompleted = completedPairs.length === numberOfPairs;

    if (allPairsCompleted) {
        return (
            <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                        ¡Has completado todos los pares!
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">
                        Puedes empezar una nueva sesión.
                    </p>
                </div>

                {/* Estado de pares completados */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className={`grid gap-3 sm:gap-4 ${
                        numberOfPairs <= 2 ? 'grid-cols-2' :
                        numberOfPairs <= 3 ? 'grid-cols-3' :
                        numberOfPairs <= 4 ? 'grid-cols-2 sm:grid-cols-4' :
                        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                    }`}>
                        {Array.from({ length: numberOfPairs }, (_, i) => (
                            <div key={i} className="bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                                <div className="font-bold text-gray-800 text-sm sm:text-base">Par {i + 1}</div>
                                <div className="text-xs sm:text-sm text-gray-600">(Completado)</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón de acción */}
                <div className="flex justify-center">
                    <button
                        onClick={onReset}
                        className="btn-action px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                    >
                        Empezar de Nuevo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="container-glass">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                    Selecciona un Par para Trabajar
                </h1>
                <p className="text-sm sm:text-base text-secondary text-center mb-3">
                    Elige el par de cartas que quieres procesar ahora.
                </p>
                {/* Progress indicator */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-lg font-bold text-blue-700">
                            {completedPairs.length} / {numberOfPairs}
                        </span>
                        <span className="text-sm text-secondary">completados</span>
                    </div>
                    <div className="progress-bar max-w-md mx-auto">
                        <div
                            className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${(completedPairs.length / numberOfPairs) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Grid de pares */}
            <div className="container-glass">
                <div className={`grid gap-3 sm:gap-4 ${
                    numberOfPairs <= 2 ? 'grid-cols-2' :
                    numberOfPairs <= 3 ? 'grid-cols-3' :
                    numberOfPairs <= 4 ? 'grid-cols-2 sm:grid-cols-4' :
                    'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                }`}>
                    {Array.from({ length: numberOfPairs }, (_, i) => {
                        const isCompleted = completedPairs.includes(i);
                        return (
                            <button
                                key={i}
                                onClick={() => onSelectPair(i)}
                                disabled={isCompleted}
                                className={`p-4 sm:p-6 rounded-lg text-center transition-all duration-200 shadow-lg hover:scale-105 border-2 ${
                                    isCompleted
                                        ? 'bg-green-100 text-green-800 cursor-not-allowed border-green-300 opacity-75'
                                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300 hover:border-blue-400'
                                }`}
                                aria-label={isCompleted ? `Par ${i + 1} ya completado` : `Seleccionar par ${i + 1} para trabajar`}
                                aria-disabled={isCompleted}
                            >
                                <div className="font-bold text-sm sm:text-base mb-1">
                                    Par {i + 1}
                                </div>
                                <div className="text-xs sm:text-sm">
                                    {isCompleted ? 'Completado' : 'Pendiente'}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                    onClick={onReset}
                    className="btn btn-secondary btn-lg"
                    aria-label="Reiniciar toda la sesión desde el principio"
                >
                    Reiniciar Todo
                </button>
            </div>
        </div>
    );
};

export default PairSelectionScreen;