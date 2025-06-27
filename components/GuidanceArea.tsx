import React from 'react';
import { STEP_DETAILS } from '../constants';
import type { GamePhase, AllInputs, ProcessPath, StepKey } from '../types';
import ActionButtons from './ActionButtons';
import Summary from './Summary';

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
    if (gamePhase === 'choosing_path') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-center fade-in">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#5D4333' }}>¿Qué quieres ver primero?</h2>
                <div className="flex justify-center gap-4">
                    <button type="button" onClick={() => onChoosePath('image')} className="btn-secondary px-6 py-3 rounded-full font-bold text-lg">La Imagen</button>
                    <button type="button" onClick={() => onChoosePath('word')} className="btn-secondary px-6 py-3 rounded-full font-bold text-lg">La Palabra</button>
                </div>
                 <button type="button" onClick={onBack} className="btn-secondary text-sm px-4 py-2 rounded-full mt-6">
                    Volver a selección de pares
                </button>
            </div>
        );
    }
    
    if (gamePhase === 'processing' && currentStepKey) {
        const stepDetail = STEP_DETAILS[currentStepKey];
        const inputId = `input_${currentStepKey}`;
        const currentPairInputs = inputs[currentPairIndex] || {};

        return (
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col flex-grow fade-in">
                    <p className="text-gray-700 mb-4">{stepDetail.prompt}</p>
                    {currentStepKey === 'self_connection' && <Summary inputs={inputs} />}
                    <textarea
                        id={inputId}
                        value={currentPairInputs[inputId] || ''}
                        onChange={(e) => onInputChange(inputId, e.target.value)}
                        className="w-full flex-grow mt-2"
                        placeholder={stepDetail.placeholder}
                        rows={10}
                    />
                </div>
                <ActionButtons
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onBack={onBack}
                    onNext={onNext}
                    onReset={onReset}
                />
            </div>
        );
    }

    return null;
};

export default GuidanceArea;