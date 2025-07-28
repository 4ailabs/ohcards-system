import React, { useState } from 'react';

interface StartScreenProps {
    situation: string;
    onSituationChange: (value: string) => void;
    onStart: (pairCount: number) => void;
    onGoToCanvas: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ situation, onSituationChange, onStart, onGoToCanvas }) => {
    const [pairCount, setPairCount] = useState(1);
    const pairOptions = [1, 3, 5];

    return (
        <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
                    Simulador OH Cards
                </h1>
                <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">
                    Explora tus pensamientos y emociones a través de las cartas proyectivas
                </p>
            </div>

            {/* Situación */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                    ¿Qué situación quieres explorar?
                </h2>
                <textarea
                    value={situation}
                    onChange={(e) => onSituationChange(e.target.value)}
                    placeholder="Describe brevemente la situación, emoción o tema que quieres explorar..."
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                    rows={4}
                />
            </div>

            {/* Selección de pares */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                    ¿Cuántos pares de cartas quieres usar?
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    {pairOptions.map(count => (
                        <button
                            key={count}
                            type="button"
                            onClick={() => setPairCount(count)}
                            className={`px-4 sm:px-6 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:scale-105 ${
                                pairCount === count 
                                    ? 'btn-action' 
                                    : 'btn-secondary'
                            }`}
                        >
                            {count} {count > 1 ? 'Pares' : 'Par'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                    type="button"
                    onClick={() => onStart(pairCount)}
                    className="btn-action px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
                >
                    Proceso Completo
                </button>
                <button
                    type="button"
                    onClick={onGoToCanvas}
                    className="btn-secondary px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
                >
                    Solo Lienzo de Cartas
                </button>
            </div>
        </div>
    );
};

export default StartScreen;