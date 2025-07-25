// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useMemo, FormEvent, PropsWithChildren, ReactElement } from "react";

import app from "../../firebase";
import { User } from "../../types";
import { AuthContext } from "../Context";
import { useStoreLocation } from "../useContext";

/**
 * @description AuthProvider go
 * @param param0
 * @returns
 */
const AuthProvider = ({ children }: PropsWithChildren): ReactElement => {
  const { storeLocation } = useStoreLocation();
  const handleLogin = async (
    ev: FormEvent,
    user: User,
    setError: (err: { email?: string; password?: string; general?: string }) => void,
    navigate: (path: string) => void
  ) => {
    ev.preventDefault();
    const newError: { email?: string; password?: string; general?: string } = {};
    if (!user.email.trim()) {
      newError.email = "Email is required.";
    }
    if (!user.password.trim()) {
      newError.password = "Password is required.";
    }
    if (newError.email || newError.password) {
      setError(newError);
      return;
    }
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setTimeout(() => {
        setError({});
        setTimeout(() => {
          navigate(`/pick/${storeLocation}`);
        }, 500);
      });
    } catch {
      setError({ general: "Invalid Email/Password" });
    }
  };
  const value = useMemo(() => ({ handleLogin }), [handleLogin]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default AuthProvider;
