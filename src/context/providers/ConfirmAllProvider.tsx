// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useMemo, PropsWithChildren, ReactElement } from "react";

import ConfirmAllModal from "../../modals/ConfirmAllModal";
import { ConfirmAllContext } from "../Context";

const ConfirmAllProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [confirmAll, setConfirmAll] = useState<boolean>(false);
  const value = useMemo(() => ({ confirmAll, setConfirmAll }), [confirmAll, setConfirmAll]);
  return (
    <ConfirmAllContext.Provider value={value}>
      {children}
      {confirmAll && <ConfirmAllModal />}
    </ConfirmAllContext.Provider>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ConfirmAllProvider;
