// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, useMemo, useEffect, PropsWithChildren, ReactElement } from 'react';

import { StoreLocations } from '../../types';
import { StoreLocationContext } from '../Context';

const StoreLocationProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [storeLocation, setStoreLocation] = useState<StoreLocations>(
    () => (localStorage.getItem('storeLocation') as StoreLocations) || 'Oakville'
  );

  useEffect(() => {
    localStorage.setItem('storeLocation', storeLocation);
  }, [storeLocation]);

  const value = useMemo(
    () => ({ storeLocation, setStoreLocation }),
    [storeLocation, setStoreLocation]
  );
  return <StoreLocationContext.Provider value={value}>{children}</StoreLocationContext.Provider>;
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default StoreLocationProvider;
