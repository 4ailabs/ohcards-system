
import React from 'react';
import { STEP_DETAILS } from '../constants';
import type { AllInputs, StepKey } from '../types';

interface SummaryProps {
    inputs: AllInputs;
}

const Summary: React.FC<SummaryProps> = ({ inputs }) => {
    const pairIndices = Object.keys(inputs).map(Number).sort((a, b) => a - b);
    
    const hasAnyInput = pairIndices.some(i => Object.values(inputs[i]).some(v => v));
    if (!hasAnyInput) return null;

    return (
        <div className="space-y-4 my-4 overflow-y-auto max-h-48">
            <h4 className="font-semibold text-gray-800">Tus Reflexiones:</h4>
            {pairIndices.map(pairIndex => {
                const pairInputs = inputs[pairIndex];
                const hasValues = Object.values(pairInputs).some(v => v);
                if (!hasValues) return null;

                return (
                    <div key={pairIndex}>
                        {pairIndices.length > 1 && (
                             <p className="font-bold text-md text-gray-600 mb-2 mt-3">Par {pairIndex + 1}</p>
                        )}
                        <div className="space-y-2 pl-2 border-l-2 border-gray-200">
                           {Object.entries(pairInputs).map(([key, value]) => {
                                if (!value) return null;
                                const stepKey = key.replace('input_', '') as StepKey;
                                const stepName = STEP_DETAILS[stepKey]?.name || 'Reflexión';
                                return (
                                    <div key={key} className="summary-box">
                                        <p className="font-semibold text-sm">{stepName}:</p>
                                        <p className="whitespace-pre-wrap">{value}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Summary;
