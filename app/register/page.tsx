"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

const roleOptions = [
  { value: "owner", label: "Owner - Horse ownership access" },
  { value: "investor", label: "Investor - Read access to assigned horses" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("owner");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          selected_role: role,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?role=${role}`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    if (data.user) {
      setSuccess(true);
      await assignRole(data.user.id, role);
    }
  }

  async function assignRole(userId: string, userRole: string) {
    try {
      const roleSlug = userRole === "owner" ? "owner" : "investor";

      const { data: roleData } = await supabase
        .from("roles")
        .select("id")
        .eq("slug", roleSlug)
        .single();

      if (!roleData) {
        console.error("Role not found:", roleSlug);
        return;
      }

      await supabase.from("users").upsert({
        id: userId,
        email,
        display_name: displayName,
        status: "active",
      });

      await supabase.from("user_roles").insert({
        user_id: userId,
        role_id: roleData.id,
      });
    } catch (err) {
      console.error("Error assigning role:", err);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-8 text-center">
          <div className="rounded-3xl bg-surface p-8 shadow-card">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-text-primary">Check your email</h2>
            <p className="mt-2 text-sm text-text-secondary">
              We sent a confirmation link to <strong>{email}</strong>.
              Please click the link to activate your account.
            </p>
            <Button
              onClick={() => router.push("/auth/login")}
              className="mt-6 w-full"
            >
              Go to Sign In
            </Button>
          </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Create Account</h1>
          <p className="mt-2 text-sm text-text-secondary">Join HorseApp today</p>
        </div>

        {/* Signup Card */}
        <div className="rounded-3xl bg-surface p-6 shadow-card">
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Display Name"
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Select
              label="Select Your Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={roleOptions}
            />
            <p className="text-xs text-text-muted -mt-2">
              Choose based on your primary use case
            </p>

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Create Account
            </Button>
          </form>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:text-primary-600">
            Sign in
          </Link>
        </p>

        {/* Admin link */}
        <p className="text-center text-sm text-text-muted">
          Are you an administrator?{" "}
          <Link href="/admin/login" className="font-medium text-text-secondary hover:text-text-primary">
            Admin Login
          </Link>
        </p>

        {/* Role Info */}
        <div className="rounded-2xl bg-surface p-4">
          <h3 className="text-sm font-medium text-text-primary mb-2">Role Information</h3>
          <div className="space-y-2 text-xs text-text-secondary">
            <p><strong>Owner:</strong> Full read access to your horses' health, feeding, races, and more.</p>
            <p><strong>Investor:</strong> Read access to assigned horses and performance reports.</p>
            <p className="text-text-muted mt-2">Need admin access? Contact your administrator.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
