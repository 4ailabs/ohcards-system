import React from 'react';

interface SummaryScreenProps {
    chosenImages: string[];
    chosenWords: string[];
    numberOfPairs: number;
    inputs: { [key: number]: { [key: string]: string } };
    onReset: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({
    chosenImages,
    chosenWords,
    numberOfPairs,
    inputs,
    onReset
}) => {
    const renderCard = (index: number, isImage: boolean) => {
        const content = isImage ? chosenImages[index] : chosenWords[index];
        const cardNumber = index + 1;

        return (
            <div key={`${index}-${isImage ? 'image' : 'word'}`} className="relative">
                {/* Número de identificación */}
                <div className="absolute -top-1 -left-1 bg-yellow-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold z-10">
                    {cardNumber}
                </div>
                
                {/* Tipo de carta */}
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold z-10">
                    {isImage ? 'I' : 'P'}
                </div>

                {/* Carta - Proporción 2:3 como carta real */}
                <div className="card-oh-md sm:card-oh-lg md:card-oh-lg lg:card-oh-xl">
                    <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-300">
                        {isImage ? (
                            <img
                                src={content}
                                alt={`Imagen ${cardNumber}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-2 relative bg-white rounded-lg">
                                {/* Palabra en layout de carta OH */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Palabra en los 4 lados */}
                                    <span className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-gray-800 uppercase">{content}</span>
                                    <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-gray-800 uppercase">{content}</span>
                                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs sm:text-sm font-bold text-gray-800 uppercase">{content}</span>
                                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 text-xs sm:text-sm font-bold text-gray-800 uppercase">{content}</span>

                                    {/* Marco rojo interior */}
                                    <div className="absolute border-2 border-red-500 rounded" style={{ top: '15%', left: '15%', right: '15%', bottom: '15%' }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderPairSummary = (pairIndex: number) => {
        const pairInputs = inputs[pairIndex] || {};

        return (
            <div key={pairIndex} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                    Par {pairIndex + 1} - Resumen
                </h3>
                
                {/* Cartas del par */}
                <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {renderCard(pairIndex, true)}  {/* Imagen */}
                    {renderCard(pairIndex, false)} {/* Palabra */}
                </div>

                {/* Resumen de respuestas */}
                {Object.keys(pairInputs).length > 0 && (
                    <div className="space-y-2 sm:space-y-3">
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Tus reflexiones:</h4>
                        {Object.entries(pairInputs).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 rounded-lg p-2 sm:p-3">
                                <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                                    {key === 'describe_image' && 'Descripción de la imagen:'}
                                    {key === 'create_story' && 'Historia creada:'}
                                    {key === 'define_word' && 'Definición de la palabra:'}
                                    {key === 'combination' && 'Combinación imagen-palabra:'}
                                    {key === 'self_connection' && 'Conexión personal:'}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
                    ¡Proceso Completado!
                </h1>
                <p className="text-sm sm:text-base text-gray-600 text-center mb-3 sm:mb-4">
                    Has completado exitosamente el proceso con {numberOfPairs} {numberOfPairs > 1 ? 'pares' : 'par'} de cartas.
                </p>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                    Aquí tienes un resumen de todas tus cartas y reflexiones:
                </p>
            </div>

            {/* Resumen de cada par */}
            <div className="space-y-4 sm:space-y-6">
                {Array.from({ length: numberOfPairs }, (_, i) => renderPairSummary(i))}
            </div>

            {/* Vista general de todas las cartas */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                    Vista General de Todas las Cartas
                </h2>
                <div className={`grid gap-2 sm:gap-3 md:gap-4 justify-items-center ${
                    numberOfPairs <= 2 ? 'grid-cols-2 sm:grid-cols-4' :
                    numberOfPairs <= 3 ? 'grid-cols-3 sm:grid-cols-6' :
                    numberOfPairs <= 4 ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8' :
                    numberOfPairs <= 5 ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10' :
                    'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12'
                }`}>
                    {Array.from({ length: numberOfPairs }, (_, i) => (
                        <React.Fragment key={i}>
                            {renderCard(i, true)}   {/* Imagen */}
                            {renderCard(i, false)}  {/* Palabra */}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                    onClick={onReset}
                    className="btn-action px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                >
                    Empezar Nueva Sesión
                </button>
            </div>
        </div>
    );
};

export default SummaryScreen; 