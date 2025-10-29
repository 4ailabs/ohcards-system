import React, { useState } from 'react';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Contraseña predeterminada - puedes cambiarla
        const correctPassword = 'OHCARDS2024';

        setTimeout(() => {
            if (password === correctPassword) {
                localStorage.setItem('ohcards-authenticated', 'true');
                onLogin();
            } else {
                setError('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
                setPassword('');
            }
            setIsLoading(false);
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

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="Ingresa tu contraseña"
                                style={{ fontSize: '16px' }}
                                autoFocus
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? 'Ocultar' : 'Ver'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !password}
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Verificando...' : 'Ingresar'}
                    </button>
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

