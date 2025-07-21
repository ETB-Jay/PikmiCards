// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import app from '../../firebase';

import type { User as FirebaseUser } from 'firebase/auth';

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

  if (loading) {
    return null;
  }
  if (!firebaseUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ProtectedRoute;
