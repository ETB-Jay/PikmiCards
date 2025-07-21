// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { useState, ChangeEvent, ReactElement, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputField, Button, FlexColCenter, ErrorBox, Title } from '../components';
import BasicContainer from '../components/containers/BasicContainer';
import PikmicardBannerIcon from '../components/icons/PikmicardBannerIcon';
import { cn } from '../context/functions';
import { useAuth } from '../context/useContext';
import { User } from '../types';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOGIN_TITLE = 'Login';
const LOGIN_BUTTON_TEXT = 'Sign In';

/**
 * Login page component for user authentication.
 * Provides email and password input fields with form validation and error handling.
 * @returns The login page component
 */
function Login(): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const employee: User = { email, password };

  return (
    <FlexColCenter className={cn('animate-fade-in h-screen w-fit max-w-xl min-w-lg')}>
      <form
        onSubmit={(ev) => {
          handleLogin(ev, employee, setError, navigate);
        }}
        className="group relative flex h-full w-full flex-col items-center justify-center gap-3"
      >
        <PikmicardBannerIcon className={cn('mb-4 h-auto w-3/5 drop-shadow-2xl')} />
        <BasicContainer className="flex w-full flex-col rounded-lg p-5 shadow-2xl shadow-black/40 transition-all">
          <Title text={LOGIN_TITLE} />
          <InputField
            label="Email"
            type="text"
            value={email}
            onChange={(input: ChangeEvent<HTMLInputElement>) => {
              setEmail(input.target.value);
            }}
            icon={<PersonIcon />}
            err={error.email || ''}
            autoComplete="email"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(input: ChangeEvent<HTMLInputElement>) => {
              setPassword(input.target.value);
            }}
            icon={<KeyIcon />}
            err={error.password || ''}
            autoComplete="current-password"
          />
          {error.general && <ErrorBox text={error.general} />}
          <Button
            label={LOGIN_BUTTON_TEXT}
            icon={<LoginIcon />}
            onAction={(ev?: MouseEvent<HTMLButtonElement>) => {
              if (ev) {
                handleLogin(ev, employee, setError, navigate);
              }
            }}
            ref={null}
            type="submit"
          />
        </BasicContainer>
      </form>
    </FlexColCenter>
  );
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Login;
