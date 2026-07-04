import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { User, Role, UserRole } from "@/types";

// For client-side usage
export function getClientSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// For server-side usage
export function getServerSupabase(supabaseUrl: string, serviceRoleKey: string) {
  return createClient(supabaseUrl, serviceRoleKey);
}

// Auth service
export const authService = {
  async signIn(email: string, password: string) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signUp(email: string, password: string, metadata?: Record<string, unknown>) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    return { data, error };
  },

  async signOut() {
    const supabase = getClientSupabase();
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getSession() {
    const supabase = getClientSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async getUser() {
    const supabase = getClientSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    const supabase = getClientSupabase();
    return supabase.auth.onAuthStateChange(callback);
  },
};

// User service
export const userService = {
  async getProfile(userId: string) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    return { data: data as User | null, error };
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("users")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();
    return { data: data as User | null, error };
  },

  async getUserRoles(userId: string) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        *,
        role:roles(*)
      `)
      .eq("user_id", userId);
    return { data: data as (UserRole & { role: Role })[] | null, error };
  },

  async hasRole(userId: string, roleSlug: string): Promise<boolean> {
    const { data, error } = await this.getUserRoles(userId);
    if (error || !data) return false;
    return data.some(ur => ur.role?.slug === roleSlug);
  },
};

// Horse service
export const horseService = {
  async getAll(options?: { status?: string; limit?: number }) {
    const supabase = getClientSupabase();
    let query = supabase
      .from("horses")
      .select("*")
      .order("name");

    if (options?.status) {
      query = query.eq("status", options.status);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async getById(id: string) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("horses")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  },

  async getWithPhotos(id: string) {
    const supabase = getClientSupabase();
    const { data: horse, error: horseError } = await supabase
      .from("horses")
      .select("*")
      .eq("id", id)
      .single();

    if (horseError || !horse) {
      return { data: null, error: horseError };
    }

    const { data: photos, error: photosError } = await supabase
      .from("horse_photos")
      .select("*")
      .eq("horse_id", id)
      .order("sort_order");

    return {
      data: { ...horse, photos: photos || [] },
      error: photosError
    };
  },

  async create(horse: Partial<import("@/types").Horse>) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("horses")
      .insert(horse)
      .select()
      .single();
    return { data, error };
  },

  async update(id: string, updates: Partial<import("@/types").Horse>) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("horses")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    return { data, error };
  },

  async delete(id: string) {
    const supabase = getClientSupabase();
    const { error } = await supabase
      .from("horses")
      .delete()
      .eq("id", id);
    return { error };
  },
};

// Ownership service
export const ownershipService = {
  async getByUser(userId: string) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("ownerships")
      .select(`
        *,
        horse:horses(*)
      `)
      .eq("user_id", userId)
      .eq("is_active", true);
    return { data, error };
  },

  async getByHorse(horseId: string) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("ownerships")
      .select(`
        *,
        user:users(id, email, display_name, avatar_url)
      `)
      .eq("horse_id", horseId)
      .eq("is_active", true);
    return { data, error };
  },
};

// Health records service
export const healthService = {
  async getByHorse(horseId: string, options?: { limit?: number }) {
    const supabase = getClientSupabase();
    let query = supabase
      .from("horse_health_records")
      .select("*")
      .eq("horse_id", horseId)
      .order("date", { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async create(record: Partial<import("@/types").HorseHealthRecord>) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("horse_health_records")
      .insert(record)
      .select()
      .single();
    return { data, error };
  },
};

// Weight service
export const weightService = {
  async getByHorse(horseId: string, options?: { limit?: number }) {
    const supabase = getClientSupabase();
    let query = supabase
      .from("horse_weight_logs")
      .select("*")
      .eq("horse_id", horseId)
      .order("date", { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async create(log: Partial<import("@/types").HorseWeightLog>) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("horse_weight_logs")
      .insert(log)
      .select()
      .single();
    return { data, error };
  },
};

// Feeding service
export const feedingService = {
  async getByHorse(horseId: string, options?: { limit?: number; date?: string }) {
    const supabase = getClientSupabase();
    let query = supabase
      .from("feeding_logs")
      .select("*")
      .eq("horse_id", horseId)
      .order("date", { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.date) {
      query = query.eq("date", options.date);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async create(log: Partial<import("@/types").FeedingLog>) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("feeding_logs")
      .insert(log)
      .select()
      .single();
    return { data, error };
  },
};

// Reports service
export const reportService = {
  async getAll(options?: { status?: string; limit?: number }) {
    const supabase = getClientSupabase();
    let query = supabase
      .from("investor_reports")
      .select("*")
      .order("period_end", { ascending: false });

    if (options?.status) {
      query = query.eq("status", options.status);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async getById(id: string) {
    const supabase = getClientSupabase();
    const { data, error } = await supabase
      .from("investor_reports")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  },
};

// Notifications service
export const notificationService = {
  async getByUser(userId: string, options?: { unreadOnly?: boolean; limit?: number }) {
    const supabase = getClientSupabase();
    let query = supabase
      .from("notifications")
      .select(`
        *,
        horse:horses(id, name)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (options?.unreadOnly) {
      query = query.is("read_at", null);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async markAsRead(id: string) {
    const supabase = getClientSupabase();
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", id);
    return { error };
  },

  async getUnreadCount(userId: string) {
    const supabase = getClientSupabase();
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .is("read_at", null);
    return { count, error };
  },
};
