import React, { useId } from 'react';
import type { GamePhase, StepKey } from '../types';

interface CardDisplayProps {
    gamePhase: GamePhase;
    currentStepKey: StepKey | null;
    chosenImage: string;
    chosenWord: string;
}

const WordCardLayout: React.FC<{ word: string; baseTextSize?: string; showInnerBorder?: boolean }> = ({
  word,
  baseTextSize = 'text-lg sm:text-xl md:text-2xl',
  showInnerBorder = true,
}) => {
  const textClasses = 'font-bold whitespace-nowrap uppercase';
  const outerTextClasses = `absolute ${textClasses}`;
  const style = { color: '#402E32' };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-2xl">
      {/* Palabra en los cuatro lados, fuera del marco rojo */}
      <p className={`${outerTextClasses} ${baseTextSize}`} style={{ ...style, top: '3.5%', left: '50%', transform: 'translateX(-50%)' }}>{word}</p>
      <p className={`${outerTextClasses} ${baseTextSize}`} style={{ ...style, bottom: '3.5%', left: '50%', transform: 'translateX(-50%)' }}>{word}</p>
      <p className={`${outerTextClasses} ${baseTextSize}`} style={{ ...style, left: '3.5%', top: '50%', transform: 'translateY(-50%) rotate(-90deg)' }}>{word}</p>
      <p className={`${outerTextClasses} ${baseTextSize}`} style={{ ...style, right: '3.5%', top: '50%', transform: 'translateY(-50%) rotate(90deg)' }}>{word}</p>
      {/* Marco rojo delgado */}
      {showInnerBorder && (
        <div
          className="absolute border border-red-500 rounded-md pointer-events-none"
          style={{
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            borderWidth: '2.5px'
          }}
        ></div>
      )}
    </div>
  );
};

// Componente reverso verde (imagen)
export const ImageCardBack: React.FC = () => (
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

// Componente reverso marrón (palabra)
export const WordCardBack: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 300 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', borderRadius: '1rem', border: '4px solid #C2A24A', background: '#fff' }}>
    <defs>
      <pattern id="scribbleBrown" patternUnits="userSpaceOnUse" width="40" height="40">
        <path d="M5 20 Q15 5 35 20 Q25 35 5 20 Z" stroke="#C2A24A" strokeWidth="2" fill="none"/>
        <path d="M20 5 Q35 15 20 35 Q5 25 20 5 Z" stroke="#C2A24A" strokeWidth="1.5" fill="none"/>
      </pattern>
    </defs>
    <rect width="300" height="420" rx="24" fill="url(#scribbleBrown)" />
    <ellipse cx="150" cy="210" rx="44" ry="22" fill="#C2A24A" fillOpacity="0.18"/>
    <text x="150" y="218" textAnchor="middle" fontSize="40" fontWeight="bold" fontFamily="Arial" fill="#A67C2E">OH</text>
  </svg>
);

// Nuevo layout para la carta en modo combinación (fiel al original)
const CombinationCard: React.FC<{ word: string; image?: string }> = ({ word, image }) => (
  <div className="relative w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-lg">
    {/* Palabra en los cuatro lados, fuera del marco rojo */}
    <span style={{ position: 'absolute', top: '3.5%', left: '50%', transform: 'translateX(-50%)', color: '#402E32', fontWeight: 700, fontSize: 'clamp(0.875rem, 2.5vw, 1.35rem)', letterSpacing: '0.08em' }}>{word}</span>
    <span style={{ position: 'absolute', bottom: '3.5%', left: '50%', transform: 'translateX(-50%)', color: '#402E32', fontWeight: 700, fontSize: 'clamp(0.875rem, 2.5vw, 1.35rem)', letterSpacing: '0.08em' }}>{word}</span>
    <span style={{ position: 'absolute', left: '3.5%', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', color: '#402E32', fontWeight: 700, fontSize: 'clamp(0.875rem, 2.5vw, 1.35rem)', letterSpacing: '0.08em' }}>{word}</span>
    <span style={{ position: 'absolute', right: '3.5%', top: '50%', transform: 'translateY(-50%) rotate(90deg)', color: '#402E32', fontWeight: 700, fontSize: 'clamp(0.875rem, 2.5vw, 1.35rem)', letterSpacing: '0.08em' }}>{word}</span>
    {/* Marco rojo delgado y la imagen (solo si image está definida) */}
    <div style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', border: '2.5px solid #D32F2F', borderRadius: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', overflow: 'hidden' }}>
      {image && (
        <img src={image} alt="Carta de Imagen" style={{ width: '98%', height: '98%', objectFit: 'contain', borderRadius: '0.5rem' }} onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x560/FDFBF8/402E32?text=Error'; }} />
      )}
    </div>
  </div>
);

const CardDisplay: React.FC<CardDisplayProps> = ({ gamePhase, currentStepKey, chosenImage, chosenWord }) => {

    if (gamePhase === 'choosing_path') {
        return (
            <div className="absolute inset-0 flex gap-2 sm:gap-4 items-center justify-center">
                <div className="w-32 h-44 sm:w-40 sm:h-56 md:w-48 md:h-64">
                    <ImageCardBack />
                </div>
                <div className="w-32 h-44 sm:w-40 sm:h-56 md:w-48 md:h-64">
                    <WordCardBack />
                </div>
            </div>
        );
    }

    const showOnlyImage = currentStepKey === 'describe_image' || currentStepKey === 'create_story';
    const showOnlyWord = currentStepKey === 'define_word';
    const showCombination = currentStepKey === 'combination' || currentStepKey === 'self_connection';

    return (
        <>
            {/* View for Image only */}
            <div className={`absolute inset-0 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-opacity duration-500 ${showOnlyImage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <img src={chosenImage} alt="Carta de Imagen" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x560/FDFBF8/402E32?text=Error'; }} />
            </div>

            {/* View for Word only (usa el layout fiel al original) */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${showOnlyWord ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <CombinationCard word={chosenWord} image={undefined as any} />
            </div>

            {/* View for Combination */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${showCombination ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <CombinationCard word={chosenWord} image={chosenImage} />
            </div>
        </>
    );
};

export default CardDisplay;