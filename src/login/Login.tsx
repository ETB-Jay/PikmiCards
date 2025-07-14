// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';

import { MainContainer, FlexColCenter, ErrorBox } from '../components/containers';
import { useAuth } from '../context/useContext';
import { InputField, Button } from '../components/formComponents';

const LOGIN_TITLE = 'Login';
const LOGIN_BUTTON_TEXT = 'Sign In';

/** @description Login page component for user authentication. */
function Login(): React.ReactElement {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const { logout, handleLogin } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <MainContainer>
      <FlexColCenter className="animate-fade-in max-w-xl gap-7">
        <img
          src="/pikmicard.png"
          alt=""
          className="relative top-0 z-20 h-24 w-auto drop-shadow-2xl"
        />
        <form
          onSubmit={(ev) => handleLogin(ev, username, password, setError)}
          className="bg-green-smoke-400/50 ring-green-smoke-600 border-green-smoke-300 z-10 flex w-full flex-col items-center gap-6 rounded-2xl border py-8 shadow-2xl ring-2 backdrop-blur-md"
        >
          <h1 className="text-green-smoke-950 mb-2 text-center text-3xl font-extrabold tracking-wide drop-shadow">
            {LOGIN_TITLE}
          </h1>
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(input: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(input.target.value);
            }}
            icon={<PersonIcon />}
            err={error.username || ''}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(input: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(input.target.value);
            }}
            icon={<KeyIcon />}
            err={error.password || ''}
          />
          {error.general && <ErrorBox>{error.general}</ErrorBox>}
          <Button
            label={LOGIN_BUTTON_TEXT}
            icon={<LoginIcon />}
            onClick={(event) => handleLogin(event, username, password, setError)}
            ref={null}
            type="submit"
          />
        </form>
      </FlexColCenter>
    </MainContainer>
  );
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Login;
