"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function handleCallback() {
      const { error } = await supabase.auth.getSession();
      if (error) {
        setError(error.message);
        return;
      }
      router.replace("/horses");
    }

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="mx-auto mt-24 w-full max-w-sm space-y-4 rounded-2xl border bg-white p-6 shadow-sm text-center">
        <p className="text-red-600">Authentication error: {error}</p>
        <button
          onClick={() => router.push("/auth/login")}
          className="text-sm text-blue-600 hover:underline"
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-24 w-full max-w-sm space-y-4 rounded-2xl border bg-white p-6 shadow-sm text-center">
      <p className="text-gray-500">Signing you in...</p>
    </div>
  );
}
