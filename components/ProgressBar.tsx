
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
        <div className="p-4 border-b border-gray-200 text-center">
            <p className="font-bold text-lg" style={{ color: '#5D4333' }}>
                {totalPairs > 1 && `Par ${currentPair} de ${totalPairs} - `}
                Paso <span className="current-step-display">{currentStep}</span> de <span className="total-steps-display">{totalSteps}</span>: <span className="step-name-display">{stepName}</span>
            </p>
        </div>
    );
};

export default ProgressBar;
