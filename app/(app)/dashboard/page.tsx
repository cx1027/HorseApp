"use client";

import { useUserRole } from "@/hooks/useUserRole";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import StaffDashboard from "@/components/dashboard/StaffDashboard";
import InvestorDashboard from "@/components/dashboard/InvestorDashboard";
import OwnerDashboard from "@/components/dashboard/OwnerDashboard";

export default function DashboardPage() {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "staff":
      return <StaffDashboard />;
    case "investor":
      return <InvestorDashboard />;
    case "owner":
      return <OwnerDashboard />;
    default:
      // No specific role, show a default dashboard
      return <StaffDashboard />;
  }
}
