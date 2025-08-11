// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useMemo, useEffect, PropsWithChildren, ReactElement } from "react";

import { StoreLocations } from "../../types";
import { StoreLocationContext } from "../Context";

/** StoreLocationProvider provides the location of the store currently being picked */
const StoreLocationProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [storeLocation, setStoreLocation] = useState<StoreLocations>(
    () => (localStorage.getItem("storeLocation") as StoreLocations) || "ETB Oakville"
  );

  useEffect(() => {
    localStorage.setItem("storeLocation", storeLocation);
  }, [storeLocation]);

  const value = useMemo(
    () => ({ storeLocation, setStoreLocation }),
    [storeLocation, setStoreLocation]
  );
  return <StoreLocationContext.Provider value={value}>{children}</StoreLocationContext.Provider>;
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default StoreLocationProvider;
