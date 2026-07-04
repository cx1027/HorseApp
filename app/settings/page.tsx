"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { PageHeader, Card, Button, Input, Avatar, Badge } from "@/components/ui";

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function signOut() {
    setIsLoading(true);
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader title="Settings" />

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Profile Section */}
        <Card>
          <h2 className="font-semibold text-text-primary mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <Avatar size="lg" fallback="U" className="h-16 w-16 text-xl" />
            <div>
              <p className="text-lg font-semibold text-text-primary">Demo User</p>
              <p className="text-sm text-text-secondary">demo@horseapp.com</p>
              <Badge variant="success" className="mt-1">Verified</Badge>
            </div>
          </div>
          <div className="space-y-4">
            <Input
              label="Display Name"
              defaultValue="Demo User"
              placeholder="Enter your name"
            />
            <Input
              label="Email"
              type="email"
              defaultValue="demo@horseapp.com"
              disabled
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="primary">Save Changes</Button>
          </div>
        </Card>

        {/* Preferences */}
        <Card>
          <h2 className="font-semibold text-text-primary mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Email Notifications</p>
                <p className="text-sm text-text-secondary">Receive email updates</p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-primary transition-colors">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Push Notifications</p>
                <p className="text-sm text-text-secondary">Receive push alerts</p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-primary transition-colors">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Marketing Emails</p>
                <p className="text-sm text-text-secondary">Receive promotional content</p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-background-primary transition-colors">
                <span className="inline-block h-5 w-5 transform rounded-full bg-text-muted transition-transform translate-x-1" />
              </button>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card>
          <h2 className="font-semibold text-text-primary mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Password</p>
                <p className="text-sm text-text-secondary">Last changed 30 days ago</p>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Two-Factor Authentication</p>
                <p className="text-sm text-text-secondary">Add an extra layer of security</p>
              </div>
              <Button variant="ghost" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Connected Accounts</p>
                <p className="text-sm text-text-secondary">Google connected</p>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
          </div>
        </Card>

        {/* Connected Accounts */}
        <Card>
          <h2 className="font-semibold text-text-primary mb-4">Connected Accounts</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background-primary">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Google</p>
                  <p className="text-sm text-text-secondary">Connected</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Disconnect</Button>
            </div>
          </div>
        </Card>

        {/* App Info */}
        <Card>
          <h2 className="font-semibold text-text-primary mb-4">About</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary">Version</p>
              <p className="text-text-primary">1.0.0</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary">Terms of Service</p>
              <Button variant="ghost" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary">Privacy Policy</p>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          </div>
        </Card>

        {/* Sign Out */}
        <Card className="bg-primary-soft border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-primary">Sign Out</p>
              <p className="text-sm text-text-secondary">Sign out of your account</p>
            </div>
            <Button variant="primary" onClick={signOut} isLoading={isLoading}>
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
