import React, { useState } from 'react';
import ImageSelectionScreen from './ImageSelectionScreen';
import WordSelectionScreen from './WordSelectionScreen';

interface CanvasSetupScreenProps {
    onSetupComplete: (images: string[], words: string[], numberOfPairs: number) => void;
    onBack: () => void;
}

const CanvasSetupScreen: React.FC<CanvasSetupScreenProps> = ({
    onSetupComplete,
    onBack
}) => {
    const [currentStep, setCurrentStep] = useState<'selecting_pairs' | 'selecting_image' | 'selecting_word'>('selecting_pairs');
    const [canvasPairs, setCanvasPairs] = useState(1);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const canvasPairOptions = [1, 2, 3, 4, 5, 6];

    const handleImageSelect = (images: string[]) => {
        setSelectedImages(images);
        setCurrentStep('selecting_word');
    };

    const handleWordSelect = (words: string[]) => {
        setSelectedWords(words);
        onSetupComplete(selectedImages, words, canvasPairs);
    };

    const handleBack = () => {
        if (currentStep === 'selecting_word') {
            setCurrentStep('selecting_image');
        } else if (currentStep === 'selecting_image') {
            setCurrentStep('selecting_pairs');
        } else {
            onBack();
        }
    };

    const handlePairCountSelect = () => {
        setCurrentStep('selecting_image');
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 'selecting_pairs':
                return 'Configuración del Lienzo';
            case 'selecting_image':
                return 'Selección de Imágenes';
            case 'selecting_word':
                return 'Selección de Palabras';
            default:
                return 'Configuración del Lienzo';
        }
    };

    const getStepProgress = () => {
        switch (currentStep) {
            case 'selecting_pairs':
                return 1;
            case 'selecting_image':
                return 2;
            case 'selecting_word':
                return 3;
            default:
                return 1;
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                    {getStepTitle()}
                </h1>
                
                {/* Progress indicator */}
                <div className="flex justify-center items-center space-x-2 sm:space-x-4 mt-4">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold ${
                                step <= getStepProgress() 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-300 text-gray-600'
                            }`}>
                                {step}
                            </div>
                            {step < 3 && (
                                <div className={`w-8 sm:w-12 h-1 mx-2 ${
                                    step < getStepProgress() ? 'bg-blue-500' : 'bg-gray-300'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón de regreso */}
            <div className="mb-4 sm:mb-6">
                <button
                    onClick={handleBack}
                    className="btn-secondary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                >
                    ← Volver
                </button>
            </div>

            {currentStep === 'selecting_pairs' && (
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                        ¿Cuántos pares de cartas quieres en tu lienzo?
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-6">
                        {canvasPairOptions.map(count => (
                            <button
                                key={count}
                                type="button"
                                onClick={() => setCanvasPairs(count)}
                                className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg hover:scale-105 ${
                                    canvasPairs === count ? 'btn-action' : 'btn-secondary'
                                }`}
                            >
                                {count} {count > 1 ? 'Pares' : 'Par'}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handlePairCountSelect}
                            className="btn-action px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            )}

            {currentStep === 'selecting_image' && (
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                        Selecciona {canvasPairs} {canvasPairs > 1 ? 'imágenes' : 'imagen'} para tu lienzo
                    </h2>
                    <ImageSelectionScreen
                        onSelect={handleImageSelect}
                        numberOfPairs={canvasPairs}
                    />
                </div>
            )}

            {currentStep === 'selecting_word' && (
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                        Selecciona {canvasPairs} {canvasPairs > 1 ? 'palabras' : 'palabra'} para tu lienzo
                    </h2>
                    <WordSelectionScreen
                        onSelect={handleWordSelect}
                        numberOfPairs={canvasPairs}
                    />
                </div>
            )}
        </div>
    );
};

export default CanvasSetupScreen; 