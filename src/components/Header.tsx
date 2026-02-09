import { supabase } from "../lib/supabase";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-semibold">October</h1>

      <button
        onClick={() => supabase.auth.signOut()}
        className="border px-4 py-2 rounded bg-white"
      >
        Logout
      </button>
    </div>
  );
}
