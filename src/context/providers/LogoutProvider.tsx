// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useMemo, PropsWithChildren, ReactElement } from "react";

import LogoutModal from "../../modals/LogoutModal";
import { LogoutContext } from "../Context";

const LogoutProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [logout, setLogout] = useState<boolean>(false);
  const value = useMemo(() => ({ logout, setLogout }), [logout, setLogout]);
  return (
    <LogoutContext.Provider value={value}>
      {children}
      {logout && <LogoutModal />}
    </LogoutContext.Provider>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LogoutProvider;
