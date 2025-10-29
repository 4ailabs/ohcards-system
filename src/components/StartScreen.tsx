import React, { useState } from 'react';

interface StartScreenProps {
    situation: string;
    onSituationChange: (value: string) => void;
    onStart: (pairCount: number) => void;
    onGoToCanvas: () => void;
    onLogout: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ situation, onSituationChange, onStart, onGoToCanvas, onLogout }) => {
    const [pairCount, setPairCount] = useState(1);
    const pairOptions = [1, 3, 5];

    return (
        <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="container-glass">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
                    Simulador OH Cards
                </h1>
                <p className="text-sm sm:text-base text-secondary text-center mb-4 sm:mb-6">
                    Explora tus pensamientos y emociones a través de las cartas proyectivas
                </p>
            </div>

            {/* Situación */}
            <div className="container-glass">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                    ¿Qué situación quieres explorar?
                </h2>
                <textarea
                    value={situation}
                    onChange={(e) => onSituationChange(e.target.value)}
                    placeholder="Describe brevemente la situación, emoción o tema que quieres explorar..."
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                    rows={4}
                    aria-label="Describe la situación que quieres explorar"
                />
            </div>

            {/* Selección de pares */}
            <div className="container-glass">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                    ¿Cuántos pares de cartas quieres usar?
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    {pairOptions.map(count => (
                        <button
                            key={count}
                            type="button"
                            onClick={() => setPairCount(count)}
                            className={`btn ${
                                pairCount === count
                                    ? 'btn-primary'
                                    : 'btn-secondary'
                            }`}
                            aria-pressed={pairCount === count}
                            aria-label={`Seleccionar ${count} ${count > 1 ? 'pares' : 'par'} de cartas`}
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
                    className="btn btn-primary btn-lg w-full sm:w-auto"
                    aria-label="Iniciar proceso completo con las cartas seleccionadas"
                >
                    Proceso Completo
                </button>
                <button
                    type="button"
                    onClick={onGoToCanvas}
                    className="btn btn-secondary btn-lg w-full sm:w-auto"
                    aria-label="Ir solo al lienzo de cartas"
                >
                    Solo Lienzo de Cartas
                </button>
            </div>

            {/* Botón de logout */}
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    onClick={onLogout}
                    className="btn btn-secondary text-sm"
                    aria-label="Cerrar sesión"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default StartScreen;