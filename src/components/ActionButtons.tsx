import React from 'react';

interface ActionButtonsProps {
    isFirstStep: boolean;
    isLastStep: boolean;
    onBack: () => void;
    onNext: () => void;
    onReset: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isFirstStep, isLastStep, onBack, onNext, onReset }) => {
    return (
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            {!isFirstStep && (
                <button 
                    type="button" 
                    onClick={onBack} 
                    className="btn-secondary px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg shadow-md w-full sm:w-auto"
                >
                    Regresar
                </button>
            )}
            {!isLastStep ? (
                <button 
                    type="button" 
                    onClick={onNext} 
                    className="btn-action px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg shadow-lg w-full sm:w-auto"
                >
                    Siguiente
                </button>
            ) : (
                <button 
                    type="button" 
                    onClick={onReset} 
                    className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg shadow-lg w-full sm:w-auto"
                >
                    Empezar de Nuevo
                </button>
            )}
        </div>
    );
};

export default ActionButtons;