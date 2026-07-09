"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User } from "@supabase/supabase-js";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        await checkIfAdmin(session.user.id);
      }
      setCheckingSession(false);
    }
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        checkIfAdmin(session.user.id);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkIfAdmin(userId: string) {
    setCheckingAdmin(true);
    try {
      const { data: userRoles } = await supabase
        .from("user_roles")
        .select(`
          role:roles (
            slug
          )
        `)
        .eq("user_id", userId);

      const hasAdminRole = userRoles?.some(
        (ur: any) => ur.role?.slug === "admin"
      );

      if (hasAdminRole) {
        setIsAdmin(true);
        router.push("/admin/users");
      }
    } catch (err) {
      console.error("Error checking admin role:", err);
    }
    setCheckingAdmin(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    if (data.user) {
      setUser(data.user);
      await checkIfAdmin(data.user.id);
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 mx-auto mb-4 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-text-secondary">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-100">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Access Denied</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Your account <strong>{user.email}</strong> does not have admin privileges.
            </p>
          </div>

          <div className="rounded-3xl bg-surface p-6 shadow-card space-y-4">
            <p className="text-center text-sm text-text-secondary">
              Please sign out and use an admin account to access this page.
            </p>
            <Button onClick={handleLogout} className="w-full">
              Sign Out
            </Button>
          </div>

          <p className="text-center text-sm text-text-muted">
            <Link href="/auth/login" className="font-medium text-primary hover:text-primary-600">
              Go to Regular Login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-soft">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Login</h1>
          <p className="mt-2 text-sm text-text-secondary">Access the HorseApp administration panel</p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-surface p-6 shadow-card">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@horseapp.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-primary">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Warning notice */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-xs text-amber-800">
            <strong>Admin Access:</strong> Only users with Admin role can access this page. Regular users should use the standard login.
          </p>
        </div>

        {/* Regular login link */}
        <p className="text-center text-sm text-text-muted">
          Not an admin?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:text-primary-600">
            Regular Login
          </Link>
        </p>
      </div>
    </div>
  );
}
