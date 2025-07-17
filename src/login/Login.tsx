// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, ChangeEvent, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

import { MainContainer, FlexColCenter, ErrorBox } from '../components/containers';
import { useAuth } from '../context/useContext';
import { InputField, Button } from '../components/formComponents';
import { cn } from '../context/functions';
import { User } from '../types';

const LOGIN_TITLE = 'Login';
const LOGIN_BUTTON_TEXT = 'Sign In';

/**
 * @description Login page component for user authentication.
 */
function Login(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const employee: User = {
    email,
    password
  };
  
  return (
    <MainContainer>
      <FlexColCenter className={cn("max-w-xl animate-fade-in gap-6")}>
        <img
          src="/pikmicard.png"
          alt=""
          className={cn("relative top-0 z-20 w-auto h-24 drop-shadow-2xl")}
        />
        <FlexColCenter className='h-fit'>
          <div className='absolute inset-0 z-0 shadow-[0_0_30px_4px] shadow-green-smoke-600 hover:shadow-[0_0_40px_2px] transition-all animate-pulse rounded-xl' />
          <form
            onSubmit={(ev) => {handleLogin(ev, employee, setError, navigate);}}
            className={cn("relative z-10 flex flex-col items-center w-full gap-6 p-8 border bg-green-smoke-400/50 ring-green-smoke-600 border-green-smoke-300 rounded-xl ring-2")}
          >
            <h1 className={cn("mb-2 text-3xl font-extrabold tracking-wide text-center text-east-bay-200 drop-shadow")}>
              {LOGIN_TITLE}
            </h1>
            <InputField
              label="Email"
              type="text"
              value={email}
              onChange={(input: ChangeEvent<HTMLInputElement>) => { setEmail(input.target.value); }}
              icon={<PersonIcon />}
              err={error.email || ''}
              autoComplete='email'
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(input: ChangeEvent<HTMLInputElement>) => { setPassword(input.target.value); }}
              icon={<KeyIcon />}
              err={error.password || ''}
              autoComplete='current-password'
            />
            {error.general && <ErrorBox>{error.general}</ErrorBox>}
            <Button
              label={LOGIN_BUTTON_TEXT}
              icon={<LoginIcon />}
              onClick={(ev) => {handleLogin(ev, employee, setError, navigate);}}
              ref={null}
              type='submit'
            />
          </form>
        </FlexColCenter>
      </FlexColCenter>
    </MainContainer>
  );
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Login;
