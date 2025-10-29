import React, { useState } from 'react';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [useButtonMethod, setUseButtonMethod] = useState(false);
    const [selectedPassword, setSelectedPassword] = useState('');

    // Contraseña predeterminada - puedes cambiarla
    const correctPassword = 'OHCARDS2024';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const passwordToCheck = useButtonMethod ? selectedPassword : password;
            if (passwordToCheck === correctPassword) {
                localStorage.setItem('ohcards-authenticated', 'true');
                onLogin();
            } else {
                setError('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
                setPassword('');
                setSelectedPassword('');
            }
            setIsLoading(false);
        }, 200);
    };

    const handleButtonPassword = (char: string) => {
        setSelectedPassword(prev => prev + char);
        setError('');
    };

    const handleClearPassword = () => {
        setSelectedPassword('');
    };

    const handleQuickLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('ohcards-authenticated', 'true');
            onLogin();
        }, 200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" 
             style={{ background: 'linear-gradient(135deg, #4B2E19 0%, #FFD600 100%)' }}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#402E32' }}>
                        Sistema OH+
                    </h1>
                    <p className="text-gray-600">
                        Ingresa tu contraseña para acceder
                    </p>
                </div>

                {/* Toggle entre métodos */}
                <div className="mb-4 flex justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => setUseButtonMethod(false)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            !useButtonMethod
                                ? 'bg-yellow-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Escribir
                    </button>
                    <button
                        type="button"
                        onClick={() => setUseButtonMethod(true)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            useButtonMethod
                                ? 'bg-yellow-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Botones (iOS)
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {!useButtonMethod ? (
                        /* Método tradicional - Input de texto */
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative" style={{ pointerEvents: 'auto' }}>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    inputMode="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    placeholder="Ingresa tu contraseña"
                                    style={{
                                        fontSize: '16px',
                                        minHeight: '48px',
                                        WebkitAppearance: 'none',
                                        pointerEvents: 'auto',
                                        cursor: 'text',
                                        touchAction: 'auto',
                                        userSelect: 'text',
                                        WebkitUserSelect: 'text'
                                    }}
                                    required
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors z-10 bg-white"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    {showPassword ? 'Ocultar' : 'Ver'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Método alternativo - Botones para iOS */
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selecciona la contraseña usando los botones
                            </label>

                            {/* Display de contraseña seleccionada */}
                            <div className="mb-4 p-3 border-2 border-gray-200 rounded-lg bg-gray-50 min-h-[48px] flex items-center justify-between">
                                <span className="text-lg tracking-widest font-mono">
                                    {selectedPassword || '(vacío)'}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleClearPassword}
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Borrar
                                </button>
                            </div>

                            {/* Botón de acceso directo */}
                            <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800 mb-3 text-center font-medium">
                                    Acceso Rápido (Solo para desarrollo/testing)
                                </p>
                                <button
                                    type="button"
                                    onClick={handleQuickLogin}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-200"
                                >
                                    Ingresar Automáticamente
                                </button>
                            </div>

                            {/* Teclado de botones para OHCARDS2024 */}
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 text-center mb-2">
                                    Toca los caracteres en orden: O-H-C-A-R-D-S-2-0-2-4
                                </p>
                                <div className="grid grid-cols-5 gap-2">
                                    {['O', 'H', 'C', 'A', 'R', 'D', 'S', '2', '0', '2', '4'].map((char, idx) => (
                                        <button
                                            key={`${char}-${idx}`}
                                            type="button"
                                            onClick={() => handleButtonPassword(char)}
                                            className="bg-yellow-600 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-md hover:bg-yellow-700 active:scale-95 transition-all"
                                        >
                                            {char}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {!useButtonMethod && (
                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Verificando...' : 'Ingresar'}
                        </button>
                    )}

                    {useButtonMethod && (
                        <button
                            type="submit"
                            disabled={isLoading || !selectedPassword}
                            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Verificando...' : 'Verificar Contraseña'}
                        </button>
                    )}
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Este es un simulador para la reflexión personal.</p>
                    <p className="mt-2">No reemplaza la consulta con un profesional cualificado.</p>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                        Creado por Dr. Miguel Ojeda Ríos
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;

