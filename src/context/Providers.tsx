// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactNode } from 'react';

import AuthProvider from './providers/AuthProvider';
import ConfirmProvider from './providers/ConfirmProvider';
import FullscreenProvider from './providers/FullscreenProvider';
import LogoutProvider from './providers/LogoutProvider';
import OrderDisplayProvider from './providers/OrderDisplayProvider';
import OrdersProvider from './providers/OrdersProvider';
import StoreLocationProvider from './providers/StoreLocationProvider';

// ─ Router ───────────────────────────────────────────────────────────────────────────────────────
const AppProviders = ({ children }: { children: ReactNode }) => (
  <StoreLocationProvider>
    <AuthProvider>
      <OrdersProvider>
        <OrderDisplayProvider>
          <ConfirmProvider>
            <FullscreenProvider>
              <LogoutProvider>{children}</LogoutProvider>
            </FullscreenProvider>
          </ConfirmProvider>
        </OrderDisplayProvider>
      </OrdersProvider>
    </AuthProvider>
  </StoreLocationProvider>
);

export default AppProviders;
