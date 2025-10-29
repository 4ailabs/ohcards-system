import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    stepName: string;
    currentPair: number;
    totalPairs: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepName, currentPair, totalPairs }) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="container-glass p-3 sm:p-4 mb-4">
            {/* Información textual */}
            <div className="text-center mb-3">
                <p className="font-bold text-sm sm:text-base md:text-lg text-primary">
                    {totalPairs > 1 && (
                        <span className="block sm:inline mb-1 sm:mb-0">
                            Par {currentPair} de {totalPairs}
                            <span className="hidden sm:inline"> - </span>
                        </span>
                    )}
                    <span className="block sm:inline">
                        Paso <span className="current-step-display">{currentStep}</span> de <span className="total-steps-display">{totalSteps}</span>
                    </span>
                </p>
                <p className="text-sm sm:text-base text-secondary mt-1">
                    <span className="step-name-display">{stepName}</span>
                </p>
            </div>

            {/* Barra de progreso visual */}
            <div className="progress-bar">
                <div
                    className="h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                    role="progressbar"
                    aria-valuenow={currentStep}
                    aria-valuemin={1}
                    aria-valuemax={totalSteps}
                    aria-label={`Progreso: paso ${currentStep} de ${totalSteps}`}
                />
            </div>
        </div>
    );
};

export default ProgressBar;