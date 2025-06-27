import React, { useState } from 'react';

interface StartScreenProps {
    situation: string;
    onSituationChange: (value: string) => void;
    onStart: (pairCount: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ situation, onSituationChange, onStart }) => {
    const [pairCount, setPairCount] = useState(1);
    const pairOptions = [1, 3, 5];

    return (
        <div className="w-full max-w-2xl text-center fade-in">
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#5D4333' }}>Simulador de Proceso OH</h1>
            <p className="text-gray-600 mt-2">Plantea una situación o pregunta que quieras explorar. Puedes escribirla aquí para enfocar tu mente.</p>
            <textarea
                value={situation}
                onChange={(e) => onSituationChange(e.target.value)}
                className="w-full mt-4 h-24"
                placeholder="Escribe aquí tu situación..."
            />
            <div className="mt-6">
                <p className="text-gray-600 mb-3">¿Cuántos pares de cartas quieres usar?</p>
                <div className="flex justify-center gap-3">
                    {pairOptions.map(count => (
                        <button
                            key={count}
                            type="button"
                            onClick={() => setPairCount(count)}
                            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                                pairCount === count ? 'btn-action shadow-md' : 'btn-secondary'
                            }`}
                        >
                            {count} {count > 1 ? 'Pares' : 'Par'}
                        </button>
                    ))}
                </div>
            </div>
            <button type="button" onClick={() => onStart(pairCount)} className="btn-action px-8 py-3 rounded-full font-bold text-lg shadow-lg mt-8">
                Seleccionar Cartas
            </button>
        </div>
    );
};

export default StartScreen;
