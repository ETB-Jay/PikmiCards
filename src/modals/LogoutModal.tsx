// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { LogoutContext } from '../context/Context';
import { cn } from '../context/functions';
import { ModalContainer } from '../components/containers';
import { Button } from '../components/formComponents';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOGOUT_MODAL_TITLE = 'Confirm Logout';
const LOGOUT_MODAL_MESSAGE = 'Are you sure you want to log out?';
const LOGOUT_MODAL_CONFIRM = 'Confirm';
const LOGOUT_MODAL_CLOSE = 'Close';

/**
 * @description LogoutModal displays a modal for confirming logout.
 */
const LogoutModal = (): React.ReactElement => {
  const { setLogout } = useContext(LogoutContext);
  const navigate = useNavigate();
  return (
    <ModalContainer>
      <h2 className={cn('text-xl font-bold text-white')}>{LOGOUT_MODAL_TITLE}</h2>
      <p className={cn('text-gray-200')}>{LOGOUT_MODAL_MESSAGE}</p>
      <div className="flex flex-row justify-center gap-4 mt-2">
        <Button
          className={cn(
            'flex items-center gap-2 min-w-[110px] px-4 py-2 rounded font-semibold transition',
            'bg-green-700 hover:bg-green-800 text-white shadow'
          )}
          onClick={() => {
            navigate('/login');
            setLogout(false);
          }}
          type="button"
          icon={<CheckIcon />}
          label={LOGOUT_MODAL_CONFIRM}
        />
        <Button
          className={cn(
            'flex items-center gap-2 min-w-[110px] px-4 py-2 rounded font-semibold transition',
            'bg-gray-300 hover:bg-gray-400 text-gray-800 shadow'
          )}
          onClick={() => setLogout(false)}
          type="button"
          icon={<CloseIcon />}
          label={LOGOUT_MODAL_CLOSE}
        />
      </div>
    </ModalContainer>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LogoutModal;
