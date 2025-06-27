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
        <div className="min-h-screen w-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4B2E19 0%, #FFD600 100%)' }}>
          <div className="w-full max-w-2xl mx-auto text-center bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-yellow-200">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 drop-shadow-lg">
              Simulador de Proceso OH
            </h1>
            <p className="text-gray-900 mt-2 font-medium">Plantea una situación o pregunta que quieras explorar. Puedes escribirla aquí para enfocar tu mente.</p>
            <textarea
                value={situation}
                onChange={(e) => onSituationChange(e.target.value)}
                className="w-full mt-4 h-24 rounded-lg border-2 border-yellow-200 bg-white/70 p-3 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                placeholder="Escribe aquí tu situación..."
            />
            <div className="mt-6">
                <p className="text-gray-900 mb-3 font-medium">¿Cuántos pares de cartas quieres usar?</p>
                <div className="flex justify-center gap-3">
                    {pairOptions.map(count => (
                        <button
                            key={count}
                            type="button"
                            onClick={() => setPairCount(count)}
                            className={pairCount === count ? 'btn-action' : 'btn-secondary'}
                        >
                            {count} {count > 1 ? 'Pares' : 'Par'}
                        </button>
                    ))}
                </div>
            </div>
            <button type="button" onClick={() => onStart(pairCount)} className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white px-10 py-3 rounded-full font-bold text-lg shadow-xl mt-8 hover:scale-105 transition-transform duration-200">
                Seleccionar Cartas
            </button>
          </div>
        </div>
    );
};

export default StartScreen;