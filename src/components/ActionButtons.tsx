
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
        <div className="mt-6 flex justify-center gap-4">
            {!isFirstStep && (
                <button type="button" onClick={onBack} className="btn-secondary px-6 py-3 rounded-full font-bold text-lg shadow-md">
                    Regresar
                </button>
            )}
            {!isLastStep ? (
                <button type="button" onClick={onNext} className="btn-action px-8 py-3 rounded-full font-bold text-lg shadow-lg">
                    Siguiente
                </button>
            ) : (
                <button type="button" onClick={onReset} className="btn-secondary px-8 py-3 rounded-full font-bold text-lg shadow-lg">
                    Empezar de Nuevo
                </button>
            )}
        </div>
    );
};

export default ActionButtons;