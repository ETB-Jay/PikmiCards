// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useMemo, PropsWithChildren, ReactElement } from "react";

import FullscreenModal from "../../modals/FullscreenModal";
import { FullscreenContext } from "../Context";

const FullscreenProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [fullScreen, setFullScreen] = useState<string | null>(null);

  const openFullscreen = (imageUrl: string) => {
    setFullScreen(imageUrl);
  };

  const closeFullscreen = () => {
    setFullScreen(null);
  };

  const value = useMemo(() => ({ openFullscreen, closeFullscreen }), []);

  return (
    <FullscreenContext.Provider value={value}>
      {children}
      {fullScreen && <FullscreenModal image={fullScreen} />}
    </FullscreenContext.Provider>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default FullscreenProvider;
