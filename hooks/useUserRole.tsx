"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

export type UserRole = "admin" | "staff" | "investor" | "owner" | null;

interface UserRoleContextType {
  role: UserRole;
  isAdmin: boolean;
  isStaff: boolean;
  isInvestor: boolean;
  isOwner: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const UserRoleContext = createContext<UserRoleContextType>({
  role: null,
  isAdmin: false,
  isStaff: false,
  isInvestor: false,
  isOwner: false,
  isLoading: true,
  refresh: async () => {},
});

const CACHE_KEY = "user_role_cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheData {
  role: UserRole;
  timestamp: number;
}

function getCachedRole(): CacheData | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached) as CacheData;
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

function setCachedRole(role: UserRole) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ role, timestamp: Date.now() }));
  } catch {
    // Ignore localStorage errors
  }
}

async function fetchUserRole(): Promise<UserRole> {
  const supabase = createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;

  // Check admin (uses RPC function)
  const { data: adminData } = await supabase.rpc("is_admin");
  if (adminData === true) return "admin";

  // Check staff (uses RPC function)
  const { data: staffData } = await supabase.rpc("is_staff");
  if (staffData === true) return "staff";

  // Check investor/owner by querying user_roles table
  const { data: userRoles } = await supabase
    .from("user_roles")
    .select(`
      roles:role_id (
        slug
      )
    `)
    .eq("user_id", session.user.id)
    .gte("expires_at", new Date().toISOString())
    .or("expires_at.is_null");

  if (userRoles) {
    for (const ur of userRoles) {
      const slug = (ur.roles as { slug: string } | null)?.slug;
      if (slug === "investor") return "investor";
      if (slug === "owner") return "owner";
    }
  }

  return null;
}

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const newRole = await fetchUserRole();
      setRole(newRole);
      setCachedRole(newRole);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check cache first
    const cached = getCachedRole();
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setRole(cached.role);
      setIsLoading(false);
      
      // Refresh in background if cache is older than 1 minute
      if (Date.now() - cached.timestamp > 60 * 1000) {
        refresh();
      }
      return;
    }

    refresh();
  }, []);

  const value: UserRoleContextType = {
    role,
    isAdmin: role === "admin",
    isStaff: role === "staff",
    isInvestor: role === "investor",
    isOwner: role === "owner",
    isLoading,
    refresh,
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserRoleContext);
}

// Simple hook that returns role booleans without provider context
export function useCheckRole() {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cached = getCachedRole();
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setRole(cached.role);
      setIsLoading(false);
      return;
    }

    fetchUserRole().then((newRole) => {
      setRole(newRole);
      setCachedRole(newRole);
      setIsLoading(false);
    }).catch(() => {
      setRole(null);
      setIsLoading(false);
    });
  }, []);

  return {
    role,
    isAdmin: role === "admin",
    isStaff: role === "staff",
    isInvestor: role === "investor",
    isOwner: role === "owner",
    isLoading,
  };
}
