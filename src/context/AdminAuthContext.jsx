import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AdminAuthContext } from "./useAdminAuth";

// Real Supabase Auth — the admin user is created once in the Supabase
// dashboard (Authentication > Users > Add user). There's no public sign-up
// here; this only signs in an existing account.
export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  };

  const logout = () => supabase.auth.signOut();

  const value = useMemo(
    () => ({ isAuthed: !!session, checking, login, logout }),
    [session, checking]
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}
