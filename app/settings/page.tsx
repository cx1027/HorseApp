"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function SettingsPage() {
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function signOut() {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-base font-semibold">Profile</h2>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Demo profile card.</p>
        <p className="mt-2 text-sm font-medium">Signed in user</p>
        <button onClick={signOut} className="mt-4 rounded-md border px-3 py-2 text-sm hover:bg-gray-50">Sign out</button>
      </div>
    </div>
  );
}
