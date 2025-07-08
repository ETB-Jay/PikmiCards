// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

import { MainContainer, FlexColCenter, ErrorBox } from '../components/containers';
import { useAuth } from '../context/useContext';
import { Button } from '../components/modal';

/**
 * @description Login page component for user authentication.
 */
function Login(): React.ReactElement {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{
    username?: string;
    password?: string;
    general?: string
  }>
    ({});
  const { login, logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

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
