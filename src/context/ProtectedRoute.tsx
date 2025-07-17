// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { Navigate } from 'react-router-dom';
import { PropsWithChildren, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

import app from '../firebase';


/**
 * @description ProtectedRoute restricts access to authenticated users only.
 * @param {{ children: React.ReactNode }} props - The children to render if authenticated.
 * @returns The protected route or redirect to login.
 */
const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) { return null };
  if (!firebaseUser) { return <Navigate to="/login" /> };
  return children;
};

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ProtectedRoute;
