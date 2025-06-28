import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    stepName: string;
    currentPair: number;
    totalPairs: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepName, currentPair, totalPairs }) => {
    return (
        <div className="p-3 sm:p-4 border-b border-gray-200 text-center">
            <p className="font-bold text-sm sm:text-base md:text-lg" style={{ color: '#5D4333' }}>
                {totalPairs > 1 && (
                    <span className="block sm:inline mb-1 sm:mb-0">
                        Par {currentPair} de {totalPairs}
                        <span className="hidden sm:inline"> - </span>
                    </span>
                )}
                <span className="block sm:inline">
                    Paso <span className="current-step-display">{currentStep}</span> de <span className="total-steps-display">{totalSteps}</span>
                </span>
                <span className="block sm:inline mt-1 sm:mt-0 sm:ml-1">
                    : <span className="step-name-display">{stepName}</span>
                </span>
            </p>
        </div>
    );
};

export default ProgressBar;