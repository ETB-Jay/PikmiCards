// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

import { MainContainer, FlexColCenter, ErrorBox } from '../components/containers';
import { useAuth } from '../context/useContext';
import { Button } from '../components/modal';

// ─ Constants ──────────────────────────────────────────────────────────────────────────────────────
const LOGIN_TITLE = 'Login';
const LOGIN_BUTTON_TEXT = 'Sign In';
const LOGIN_IMAGE_ALT = 'Login Illustration';

/**
 * Renders a styled input with an icon for the login form.
 *
 * Displays an input field with a leading icon, label/placeholder, and handles value changes.
 *
 * @returns The styled input field component.
 */
const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  icon,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}): React.ReactElement => {
  const inputId = React.useId();
  return (
    <div className="relative flex min-w-sm items-center">
      <input
        role="button"
        id={inputId}
        className="border-green-smoke-200 focus:ring-green-smoke-400 w-full rounded-xl border bg-white/80 py-2 pr-3 pl-10 text-base text-stone-800 shadow-sm transition-all placeholder:text-stone-600 focus:ring-2 focus:outline-none sm:py-2.5 sm:pl-12 sm:text-lg"
        placeholder={label}
        type={type}
        value={value}
        aria-label={inputId}
        onChange={onChange}
      />
      <span className="text-green-smoke-600 absolute top-1/2 left-3 -translate-y-1/2 text-xl sm:text-2xl">
        {icon}
      </span>
    </div>
  );
};

/**
 * @description Login page component for user authentication.
 */
function Login(): React.ReactElement {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{ username?: string; password?: string; general?: string }>(
    {}
  );
  const { login, logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

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
      <FlexColCenter className="animate-fade-in max-w-2xl">
        <img
          src="/pikmicard.png"
          alt={LOGIN_IMAGE_ALT}
          className="relative top-0 z-20 mb-6 h-24 w-auto drop-shadow-2xl"
        />
        <form
          onSubmit={handleLogin}
          className="bg-green-smoke-400/60 ring-green-smoke-600 border-green-smoke-300 z-10 flex max-w-2xl flex-col items-center gap-6 rounded-2xl border p-10 shadow-2xl ring-2 backdrop-blur-md"
        >
          <h1 className="text-green-smoke-900 mb-2 text-center text-3xl font-extrabold tracking-wide drop-shadow">
            {LOGIN_TITLE}
          </h1>
          <InputField
            label="Username"
            value={username}
            onChange={(input) => {
              setUsername(input.target.value);
            }}
            icon={<PersonIcon />}
          />
          {error.username && <ErrorBox>{error.username}</ErrorBox>}
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(input) => {
              setPassword(input.target.value);
            }}
            icon={<KeyIcon />}
          />
          {error.password && <ErrorBox>{error.password}</ErrorBox>}
          {error.general && <ErrorBox>{error.general}</ErrorBox>}
          <Button
            className="bg-green-smoke-600 hover:bg-green-smoke-700 focus:ring-green-smoke-800 mt-2 cursor-pointer rounded-xl py-2 text-lg font-bold tracking-wide text-white shadow transition-all focus:ring-2 focus:outline-none"
            type="submit"
            label={LOGIN_BUTTON_TEXT}
          />
        </form>
      </FlexColCenter>
    </MainContainer>
  );
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Login;
