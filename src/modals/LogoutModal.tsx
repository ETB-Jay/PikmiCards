// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import { ModalConfirmButton, ModalContainer } from "../components";
import { cn } from "../context/functions";
import { useLogout } from "../context/useContext";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOGOUT_MODAL_TITLE = "Confirm Logout";
const LOGOUT_MODAL_MESSAGE = "Are you sure you want to log out?";
const LOGOUT_MODAL_CONFIRM = "Confirm";
const LOGOUT_MODAL_CLOSE = "Close";

/** LogoutModal displays a modal for confirming logout. */
const LogoutModal = (): ReactElement => {
  const { setLogout } = useLogout();
  const navigate = useNavigate();

  return (
    <ModalContainer>
      <h2 className={cn("text-xl font-bold text-white")}>{LOGOUT_MODAL_TITLE}</h2>
      <p className={cn("text-gray-200")}>{LOGOUT_MODAL_MESSAGE}</p>
      <div className="mt-2 flex flex-row justify-center gap-4">
        <ModalConfirmButton
          onAction={() => {
            navigate("/login");
            setLogout(false);
          }}
          icon={<CheckIcon />}
          label={LOGOUT_MODAL_CONFIRM}
          color="green"
        />
        <ModalConfirmButton
          onAction={() => setLogout(false)}
          icon={<CloseIcon />}
          label={LOGOUT_MODAL_CLOSE}
          color="gray"
        />
      </div>
    </ModalContainer>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LogoutModal;
