/**
 * Login page for PikmiCards.
 * Provides a login form for user authentication.
 *
 * @module Login
 */
import { MainContainer } from '../components/containers';
import { useState } from 'react';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

// Placeholder for useAuth if not defined
const useAuth = () => ({ login: async () => {} });

/**
 * InputField displays a styled input with an icon for the login form.
 * @param label - The input label/placeholder.
 * @param type - The input type (default: text).
 * @param value - The input value.
 * @param onChange - Change handler for the input.
 * @param icon - Icon to display in the input.
 */
const InputField = ({ label, type = 'text', value, onChange, icon }: { label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, icon: React.ReactNode }): React.ReactElement => {
    return (
        <div className="relative flex items-center">
            <span className="absolute left-3 text-green-smoke-600">{icon}</span>
            <input
                className="bg-white/80 border border-green-smoke-200 rounded-xl pl-10 pr-4 py-2 text-base text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-green-smoke-400 transition-all shadow-sm w-full"
                placeholder={label}
                type={type}
                autoComplete={type === 'password' ? 'current-password' : 'username'}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

/**
 * Login page component for user authentication.
 */
function Login(): React.ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError('Username and password are required.');
            return;
        };
        if (username !== 'ETBETB' || password !== 'ETBETB') {
            setError('Invalid Username/Password');
            return;
        };
        await login();
        setError('');
    };

    return (
        <MainContainer>
            <div className="flex flex-col items-center justify-center w-full max-w-2xl animate-fade-in">
                <img src="/pikmicard.png" alt="Pikmi" className="relative top-0 h-24 w-auto mb-6 drop-shadow-2xl z-20" />
                <form onSubmit={handleLogin} className="flex flex-col gap-6 max-w-2xl w-[90vw] sm:w-[400px] backdrop-blur-md rounded-2xl p-10 z-10 shadow-2xl bg-green-smoke-400/60 ring-2 ring-green-smoke-600 border border-green-smoke-300">
                    <h1 className="text-3xl font-extrabold text-green-smoke-900 text-center mb-2 tracking-wide drop-shadow">Login</h1>
                    <InputField
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        icon={<PersonIcon />}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        icon={<KeyIcon />}
                    />
                    {error && <div className="bg-red-100 border border-red-300 text-red-900 text-center font-semibold rounded-lg py-2 px-3 animate-shake">{error}</div>}
                    <button
                        className="mt-2 bg-green-smoke-600 hover:bg-green-smoke-700 text-white font-bold py-2 rounded-xl shadow transition-all text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-green-smoke-800 cursor-pointer"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </MainContainer>
    );
};

export default Login;