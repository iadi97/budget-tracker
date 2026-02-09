import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendMagicLink = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Magic link sent. Check your email.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primaryLight">
      <div className="bg-white p-6 rounded border w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Login to Budget Tracker
        </h2>

        <input
          type="email"
          placeholder="you@example.com"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendMagicLink}
          disabled={loading || !email}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        {message && (
          <p className="text-sm text-center mt-3 text-gray-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
