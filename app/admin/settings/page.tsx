"use client";

import { useState } from "react";
import { PageHeader, Card, Button, Badge } from "@/components/ui";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "HorseApp",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader title="Global Settings" />

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* General Settings */}
        <Card>
          <h2 className="font-semibold text-text-primary mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full bg-background-elevated border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card>
          <h2 className="font-semibold text-text-primary mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Email Verification</p>
                <p className="text-sm text-text-secondary">Require email verification for new accounts</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, emailVerification: !settings.emailVerification })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailVerification ? "bg-primary" : "bg-background-elevated"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailVerification ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
          </div>
        </Card>

        {/* User Management */}
        <Card>
          <h2 className="font-semibold text-text-primary mb-4">User Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Registration</p>
                <p className="text-sm text-text-secondary">Allow new users to register</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, registrationEnabled: !settings.registrationEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.registrationEnabled ? "bg-primary" : "bg-background-elevated"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.registrationEnabled ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
          </div>
        </Card>

        {/* System */}
        <Card className="border-accent/30">
          <h2 className="font-semibold text-text-primary mb-4">System</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Maintenance Mode</p>
                <p className="text-sm text-text-secondary">Disable site access for non-admin users</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.maintenanceMode ? "bg-accent" : "bg-background-elevated"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
