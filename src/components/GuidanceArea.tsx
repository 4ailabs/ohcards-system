import React from 'react';
import { STEP_DETAILS } from '../constants';
import type { GamePhase, ProcessPath, StepKey, AllInputs } from '../types';
import ActionButtons from './ActionButtons';

interface GuidanceAreaProps {
    gamePhase: GamePhase;
    path: ProcessPath | null;
    currentStepKey: StepKey | null;
    isFirstStep: boolean;
    isLastStep: boolean;
    inputs: AllInputs;
    currentPairIndex: number;
    onChoosePath: (path: ProcessPath) => void;
    onInputChange: (key: string, value: string) => void;
    onNext: () => void;
    onBack: () => void;
    onReset: () => void;
}

const GuidanceArea: React.FC<GuidanceAreaProps> = ({
    gamePhase,
    path,
    currentStepKey,
    isFirstStep,
    isLastStep,
    inputs,
    currentPairIndex,
    onChoosePath,
    onInputChange,
    onNext,
    onBack,
    onReset
}) => {
    const currentInput = inputs[currentPairIndex]?.[currentStepKey || ''] || '';

    if (gamePhase === 'choosing_path') {
        return (
            <div className="flex flex-col justify-center h-full">
                <div className="container-glass mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-primary">
                        ¿Cómo quieres empezar?
                    </h2>
                    <p className="text-sm sm:text-base text-secondary">
                        Elige el orden que prefieras para explorar tus cartas
                    </p>
                </div>
                <div className="space-y-4">
                    <button
                        onClick={() => onChoosePath('image')}
                        className="w-full p-4 sm:p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
                        aria-label="Empezar el proceso con la imagen primero"
                    >
                        <div className="font-bold text-lg sm:text-xl mb-2">Empezar con la Imagen</div>
                        <div className="text-sm sm:text-base opacity-90">
                            Primero describe lo que ves, luego crea una historia, y finalmente define la palabra
                        </div>
                    </button>
                    <button
                        onClick={() => onChoosePath('word')}
                        className="w-full p-4 sm:p-6 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
                        aria-label="Empezar el proceso con la palabra primero"
                    >
                        <div className="font-bold text-lg sm:text-xl mb-2">Empezar con la Palabra</div>
                        <div className="text-sm sm:text-base opacity-90">
                            Primero define la palabra, luego describe la imagen, y finalmente crea una historia
                        </div>
                    </button>
                </div>
            </div>
        );
    }

    if (gamePhase === 'processing' && currentStepKey) {
        const stepDetail = STEP_DETAILS[currentStepKey];

        return (
            <div className="flex flex-col h-full">
                <div className="flex-1">
                    <div className="container-glass mb-4">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-primary">
                            {stepDetail.name}
                        </h2>
                        <p className="text-sm sm:text-base text-secondary leading-relaxed">
                            {stepDetail.prompt}
                        </p>
                    </div>
                    <textarea
                        value={currentInput}
                        onChange={(e) => onInputChange(currentStepKey, e.target.value)}
                        placeholder={stepDetail.placeholder}
                        className="w-full h-32 sm:h-40 md:h-48 p-3 sm:p-4 text-sm sm:text-base border-2 border-gray-200 rounded-lg resize-none bg-white"
                        aria-label={`Escribe tu respuesta para: ${stepDetail.name}`}
                    />
                </div>
                <div className="mt-4 sm:mt-6">
                    <ActionButtons
                        onNext={onNext}
                        onBack={onBack}
                        onReset={onReset}
                        isFirstStep={isFirstStep}
                        isLastStep={isLastStep}
                    />
                </div>
            </div>
        );
    }

    return null;
};

export default GuidanceArea;