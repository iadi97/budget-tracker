import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";
import Auth from "./auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return session ? (
    <ProtectedRoute session={session}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">
          Logged in successfully
        </h1>

        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </ProtectedRoute>
  ) : (
    <Auth />
  );
}

export default App;
