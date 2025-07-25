// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ReactElement, ReactNode, memo } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ModalContainer } from "../components";
import { cn } from "../context/functions";
import { useLogout } from "../context/useContext";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOGOUT_MODAL_TITLE = "Confirm Logout";
const LOGOUT_MODAL_MESSAGE = "Are you sure you want to log out?";
const LOGOUT_MODAL_CONFIRM = "Confirm";
const LOGOUT_MODAL_CLOSE = "Close";

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface LogoutModalButtonProps {
  onAction: () => void,
  icon: ReactNode,
  label: string,
  color: "green" | "gray",
}

/** LogoutModal displays a modal for confirming logout. */
const LogoutModal = (): ReactElement => {
  const { setLogout } = useLogout();
  const navigate = useNavigate();

  const LogoutModalButton = memo(({ onAction, icon, label, color }: LogoutModalButtonProps) => (
    <Button
      className={cn(
        "flex min-w-25 items-center gap-2 rounded px-4 py-2 font-semibold transition",
        color === "green"
          ? "bg-green-700 text-white shadow hover:bg-green-800"
          : "bg-gray-300 text-gray-800 shadow hover:bg-gray-400"
      )}
      onAction={onAction}
      type="button"
      icon={icon}
      label={label}
    />
  ));
  LogoutModalButton.displayName = "LogoutModalButton";

  return (
    <ModalContainer>
      <h2 className={cn("text-xl font-bold text-white")}>{LOGOUT_MODAL_TITLE}</h2>
      <p className={cn("text-gray-200")}>{LOGOUT_MODAL_MESSAGE}</p>
      <div className="mt-2 flex flex-row justify-center gap-4">
        <LogoutModalButton
          onAction={() => {
            navigate("/login");
            setLogout(false);
          }}
          icon={<CheckIcon />}
          label={LOGOUT_MODAL_CONFIRM}
          color="green"
        />
        <LogoutModalButton
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
