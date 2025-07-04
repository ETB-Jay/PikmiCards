/**
 * Login page for PikmiCards.
 * Provides a login form for user authentication.
 *
 * @module Login
 */
import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

import { MainContainer } from '../components/containers';
import { useAuth } from '../context/useContext';

// Define constants for hardcoded content
const LOGIN_TITLE = "Login";
const LOGIN_BUTTON_TEXT = "Sign In";
const LOGIN_IMAGE_ALT = "Login Illustration";

/**
 * InputField displays a styled input with an icon for the login form.
 * @param label - The input label/placeholder.
 * @param type - The input type (default: text).
 * @param value - The input value.
 * @param onChange - Change handler for the input.
 * @param icon - Icon to display in the input.
 */
const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  icon
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}): React.ReactElement => {
  // Generate a unique id for the input
  const inputId = React.useId();
  return (
    <div className="relative flex items-center">
      <label htmlFor={inputId} className="sr-only">
        {label}
        <input
          role="button"
          id={inputId}
          className="bg-white/80 border border-green-smoke-200 rounded-xl pl-10 pr-4 py-2 text-base text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-green-smoke-400 transition-all shadow-sm w-full"
          placeholder={label}
          type={type}
          value={value}
          aria-label={inputId}
          onChange={onChange}
        />
      </label>
      <span className="absolute left-3 text-green-smoke-600">{icon}</span>
    </div>
  );
};

/**
 * Login page component for user authentication.
 */
function Login(): React.ReactElement {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{ username?: string; password?: string; general?: string }>({});
  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;
    const newError: { username?: string; password?: string; general?: string } = {};
    if (!username.trim()) {
      newError.username = 'Username is required.';
      hasError = true;
    }
    if (!password.trim()) {
      newError.password = 'Password is required.';
      hasError = true;
    }
    if (hasError) {
      setError(newError);
      return;
    }
    if (username !== 'ETBETB' || password !== 'ETBETB') {
      setError({ general: 'Invalid Username/Password' });
      return;
    }
    try {
      login({ username, password });
      setError({});
    } catch {
      setError({ general: 'Login failed. Please try again.' });
    }
  };

  return (
    <MainContainer>
      <div className="flex flex-col items-center justify-center w-full max-w-2xl animate-fade-in">
        <img src="/pikmicard.png" alt={LOGIN_IMAGE_ALT} className="relative top-0 h-24 w-auto mb-6 drop-shadow-2xl z-20" />
        <form onSubmit={handleLogin} className="flex flex-col gap-6 max-w-2xl w-[90vw] sm:w-[400px] backdrop-blur-md rounded-2xl p-10 z-10 shadow-2xl bg-green-smoke-400/60 ring-2 ring-green-smoke-600 border border-green-smoke-300">
          <h1 className="text-3xl font-extrabold text-green-smoke-900 text-center mb-2 tracking-wide drop-shadow">{LOGIN_TITLE}</h1>
          <InputField
            label="Username"
            value={username}
            onChange={input => {
              setUsername(input.target.value);
            }}
            icon={<PersonIcon />}
          />
          {error.username && <div className="bg-red-100 border border-red-300 text-red-900 text-center font-semibold rounded-lg py-2 px-3 animate-shake">{error.username}</div>}
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={input => {
              setPassword(input.target.value);
            }}
            icon={<KeyIcon />}
          />
          {error.password && <div className="bg-red-100 border border-red-300 text-red-900 text-center font-semibold rounded-lg py-2 px-3 animate-shake">{error.password}</div>}
          {error.general && <div className="bg-red-100 border border-red-300 text-red-900 text-center font-semibold rounded-lg py-2 px-3 animate-shake">{error.general}</div>}
          <button
            className="mt-2 bg-green-smoke-600 hover:bg-green-smoke-700 text-white font-bold py-2 rounded-xl shadow transition-all text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-green-smoke-800 cursor-pointer"
            type="submit"
          >
            {LOGIN_BUTTON_TEXT}
          </button>
        </form>
      </div>
    </MainContainer>
  );
};

export default Login;