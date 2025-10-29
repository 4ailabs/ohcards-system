import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { PROCESS_STEPS, STEP_DETAILS } from './constants';
import type { GamePhase, AllInputs, ProcessPath, StepKey } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import LoginScreen from './components/LoginScreen';
import StartScreen from './components/StartScreen';
import ProgressBar from './components/ProgressBar';
import CardDisplay from './components/CardDisplay';
import GuidanceArea from './components/GuidanceArea';
import ImageSelectionScreen from './components/ImageSelectionScreen';
import WordSelectionScreen from './components/WordSelectionScreen';
import PairSelectionScreen from './components/PairSelectionScreen';
import CanvasScreen from './components/CanvasScreen';
import CanvasSetupScreen from './components/CanvasSetupScreen';
import SummaryScreen from './components/SummaryScreen';

const isEmbedded = window.self !== window.top;

const App: React.FC = () => {
    // Estado de autenticación
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Verificar si ya está autenticado al cargar
    useEffect(() => {
        const authenticated = localStorage.getItem('ohcards-authenticated');
        if (authenticated === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Si no está autenticado, mostrar login
    if (!isAuthenticated) {
        return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
    }
    // Estado persistido con localStorage
    const [gamePhase, setGamePhase] = useLocalStorage<GamePhase>('ohcards-gamePhase', 'start');
    const [situation, setSituation] = useLocalStorage<string>('ohcards-situation', '');
    const [path, setPath] = useLocalStorage<ProcessPath | null>('ohcards-path', null);
    const [inputs, setInputs] = useLocalStorage<AllInputs>('ohcards-inputs', {});

    // Multi-card state persistido
    const [numberOfPairs, setNumberOfPairs] = useLocalStorage<number>('ohcards-numberOfPairs', 1);
    const [chosenImages, setChosenImages] = useLocalStorage<string[]>('ohcards-chosenImages', []);
    const [chosenWords, setChosenWords] = useLocalStorage<string[]>('ohcards-chosenWords', []);
    const [currentPairIndex, setCurrentPairIndex] = useLocalStorage<number>('ohcards-currentPairIndex', 0);
    const [currentStepIndex, setCurrentStepIndex] = useLocalStorage<number>('ohcards-currentStepIndex', -1);
    const [completedPairs, setCompletedPairs] = useLocalStorage<number[]>('ohcards-completedPairs', []);


    const currentSteps = useMemo(() => {
        return path ? PROCESS_STEPS[path] : [];
    }, [path]);

    const currentStepKey = useMemo<StepKey | null>(() => {
        return currentSteps[currentStepIndex] ?? null;
    }, [currentSteps, currentStepIndex]);

    const handleReset = useCallback(() => {
        setGamePhase('start');
        setSituation('');
        setPath(null);
        setInputs({});
        setNumberOfPairs(1);
        setChosenImages([]);
        setChosenWords([]);
        setCurrentPairIndex(0);
        setCurrentStepIndex(-1);
        setCompletedPairs([]);
        // Limpiar localStorage
        localStorage.removeItem('ohcards-gamePhase');
        localStorage.removeItem('ohcards-situation');
        localStorage.removeItem('ohcards-path');
        localStorage.removeItem('ohcards-inputs');
        localStorage.removeItem('ohcards-numberOfPairs');
        localStorage.removeItem('ohcards-chosenImages');
        localStorage.removeItem('ohcards-chosenWords');
        localStorage.removeItem('ohcards-currentPairIndex');
        localStorage.removeItem('ohcards-currentStepIndex');
        localStorage.removeItem('ohcards-completedPairs');
    }, [setGamePhase, setSituation, setPath, setInputs, setNumberOfPairs, setChosenImages, setChosenWords, setCurrentPairIndex, setCurrentStepIndex, setCompletedPairs]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('ohcards-authenticated');
        setIsAuthenticated(false);
    }, []);

    const handleStart = useCallback((pairCount: number) => {
        setNumberOfPairs(pairCount);
        setGamePhase('selecting_image');
    }, []);
    
    const handleImageSelect = useCallback((imageUrls: string[]) => {
        setChosenImages(imageUrls);
        setGamePhase('selecting_word');
    }, []);

    const handleWordSelect = useCallback((words: string[]) => {
        setChosenWords(words);
        setGamePhase('choosing_pair');
    }, []);

    const handleCanvasCardSelect = useCallback((cardId: number) => {
        // Si es selección por par, cardId es el índice del par
        // Si es selección por orden, cardId es el ID de la carta individual
        const pairIndex = typeof cardId === 'number' && cardId < numberOfPairs 
            ? cardId 
            : Math.floor(cardId / 2);
        
        setCurrentPairIndex(pairIndex);
        setCurrentStepIndex(-1);
        setPath(null);
        setGamePhase('choosing_path');
    }, [numberOfPairs]);

    const handleCanvasSetupComplete = useCallback((images: string[], words: string[], numberOfPairs: number) => {
        setChosenImages(images);
        setChosenWords(words);
        setNumberOfPairs(numberOfPairs);
        setGamePhase('canvas');
    }, []);

    const handleGoToCanvas = useCallback(() => {
        setGamePhase('canvas_setup');
    }, []);

    const handleStartProcessFromCanvas = useCallback(() => {
        setGamePhase('choosing_pair');
    }, []);

    const handleStartProcessingPair = useCallback((pairIndex: number) => {
        setCurrentPairIndex(pairIndex);
        setCurrentStepIndex(-1);
        setPath(null);
        setGamePhase('choosing_path');
    }, []);

    const handlePathSelect = useCallback((chosenPath: ProcessPath) => {
        setPath(chosenPath);
        setCurrentStepIndex(0);
        setGamePhase('processing');
    }, []);

    const handleInputChange = useCallback((key: string, value: string) => {
        setInputs(prev => ({
            ...prev,
            [currentPairIndex]: {
                ...(prev[currentPairIndex] || {}),
                [key]: value
            }
        }));
    }, [currentPairIndex]);

    const handleNext = useCallback(() => {
        const isLastStepOfPair = currentStepIndex === currentSteps.length - 1;
        
        if (isLastStepOfPair) {
            const newCompletedPairs = [...new Set([...completedPairs, currentPairIndex])];
            setCompletedPairs(newCompletedPairs);
            
            // Verificar si todos los pares están completados
            if (newCompletedPairs.length === numberOfPairs) {
                setGamePhase('summary');
            } else {
                setGamePhase('choosing_pair');
            }
        } else {
            setCurrentStepIndex(prev => prev + 1);
        }
    }, [currentStepIndex, currentSteps.length, currentPairIndex, completedPairs, numberOfPairs]);

    const handleBack = useCallback(() => {
       if (gamePhase === 'processing') {
            if (currentStepIndex > 0) {
                setCurrentStepIndex(prev => prev - 1);
            } else {
                setGamePhase('choosing_path');
            }
        } else if (gamePhase === 'choosing_path') {
            setGamePhase('choosing_pair');
        }
    }, [gamePhase, currentStepIndex]);

    const renderContent = () => {
        switch (gamePhase) {
            case 'start':
                return <StartScreen
                    situation={situation}
                    onSituationChange={setSituation}
                    onStart={handleStart}
                    onGoToCanvas={handleGoToCanvas}
                    onLogout={handleLogout}
                />;
            case 'selecting_image':
                return <ImageSelectionScreen onSelect={handleImageSelect} numberOfPairs={numberOfPairs} />;
            case 'selecting_word':
                return <WordSelectionScreen onSelect={handleWordSelect} numberOfPairs={numberOfPairs} />;
            case 'canvas_setup':
                return <CanvasSetupScreen
                            onSetupComplete={handleCanvasSetupComplete}
                            onBack={() => setGamePhase('start')}
                        />;
            case 'canvas':
                return <CanvasScreen
                            chosenImages={chosenImages}
                            chosenWords={chosenWords}
                            numberOfPairs={numberOfPairs}
                            onBack={() => setGamePhase('start')}
                            onReset={handleReset}
                            onStartProcess={handleStartProcessFromCanvas}
                        />;
            case 'choosing_pair':
                return <PairSelectionScreen 
                            numberOfPairs={numberOfPairs}
                            completedPairs={completedPairs}
                            onSelectPair={handleStartProcessingPair}
                            onReset={handleReset}
                        />;
            case 'summary':
                return <SummaryScreen
                            chosenImages={chosenImages}
                            chosenWords={chosenWords}
                            numberOfPairs={numberOfPairs}
                            inputs={inputs}
                            onReset={handleReset}
                        />;
            case 'choosing_path':
            case 'processing':
                 return (
                    <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 md:p-8 fade-in">
                        <div className="bg-white rounded-2xl shadow-xl w-full">
                            {gamePhase === 'processing' && currentStepKey && path && (
                                <ProgressBar
                                    currentStep={currentStepIndex + 1}
                                    totalSteps={currentSteps.length}
                                    stepName={STEP_DETAILS[currentStepKey].name}
                                    currentPair={currentPairIndex + 1}
                                    totalPairs={numberOfPairs}
                                />
                            )}
                            <div className="flex flex-col lg:flex-row">
                                <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-200 min-h-[400px] sm:min-h-[480px] md:min-h-[520px]">
                                    <div className="relative w-56 h-80 sm:w-64 sm:h-96 md:w-80 md:h-[450px]">
                                        <CardDisplay
                                            gamePhase={gamePhase}
                                            currentStepKey={currentStepKey}
                                            chosenImage={chosenImages[currentPairIndex]}
                                            chosenWord={chosenWords[currentPairIndex]}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-[400px] sm:min-h-[480px] md:min-h-[520px]">
                                    <GuidanceArea
                                        gamePhase={gamePhase}
                                        path={path}
                                        currentStepKey={currentStepKey}
                                        isFirstStep={currentStepIndex <= 0}
                                        isLastStep={false}
                                        inputs={inputs}
                                        currentPairIndex={currentPairIndex}
                                        onChoosePath={handlePathSelect}
                                        onInputChange={handleInputChange}
                                        onNext={handleNext}
                                        onBack={handleBack}
                                        onReset={handleReset}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                handleReset();
                return null;
        }
    }

        return (
        <div className={
            `${isEmbedded ? 'min-h-0' : 'min-h-screen'} flex flex-col items-center justify-center p-2 sm:p-4`
        } style={{ background: 'linear-gradient(135deg, #4B2E19 0%, #FFD600 100%)' }}>
            {renderContent()}
            <footer className="text-center text-xs sm:text-sm text-gray-500 py-2 sm:py-3 md:py-4 mt-2 sm:mt-4 bg-white/70 rounded-lg shadow-inner w-full max-w-2xl mx-auto px-2 sm:px-4">
                <p className="leading-relaxed">Este es un simulador para la reflexión personal. No reemplaza la consulta con un profesional cualificado.</p>
                {gamePhase === 'start' && (
                    <div className="mt-2 sm:mt-3">
                        <div className="font-bold uppercase tracking-wide text-xs sm:text-sm">SISTEMA OH+ INTEGRATIVO</div>
                        <div className="text-[0.85em] sm:text-[0.95em] mt-1 leading-relaxed">Un Ecosistema Formativo y Digital en Técnicas Proyectivas con OH Cards</div>
                    </div>
                )}
                <div className="mt-2 sm:mt-3 pt-2 border-t border-gray-300/50">
                    <p className="text-[0.75em] sm:text-[0.85em] text-gray-400 leading-relaxed">
                        Creado por Dr. Miguel Ojeda Ríos
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;