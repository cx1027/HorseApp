export type UserStatus = "active" | "invited" | "disabled";
export type HorseStatus = "active" | "retired" | "injured" | "deceased";
export type ReportStatus = "draft" | "published" | "archived";
export type RecordType = "vet_checkup" | "vaccination" | "dental" | "injury" | "illness" | "checkup" | "other";
export type NotificationType = "reminder" | "update" | "report" | "system";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "created_at" | "updated_at">;
        Update: Partial<Omit<User, "id" | "created_at">>;
      };
      horses: {
        Row: Horse;
        Insert: Omit<Horse, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Horse, "id" | "created_at">>;
      };
      ownerships: {
        Row: Ownership;
        Insert: Omit<Ownership, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Ownership, "id" | "created_at">>;
      };
      horse_health_records: {
        Row: HorseHealthRecord;
        Insert: Omit<HorseHealthRecord, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<HorseHealthRecord, "id" | "created_at">>;
      };
      horse_weight_logs: {
        Row: HorseWeightLog;
        Insert: Omit<HorseWeightLog, "id" | "created_at">;
        Update: Partial<Omit<HorseWeightLog, "id" | "created_at">>;
      };
      feeding_logs: {
        Row: FeedingLog;
        Insert: Omit<FeedingLog, "id" | "created_at">;
        Update: Partial<Omit<FeedingLog, "id" | "created_at">>;
      };
      race_records: {
        Row: RaceRecord;
        Insert: Omit<RaceRecord, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<RaceRecord, "id" | "created_at">>;
      };
      insurance_policies: {
        Row: InsurancePolicy;
        Insert: Omit<InsurancePolicy, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<InsurancePolicy, "id" | "created_at">>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, "id" | "created_at">;
        Update: Partial<Omit<Notification, "id" | "created_at">>;
      };
    };
  };
}

export interface User {
  id: string;
  email: string;
  display_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  granted_by: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface Horse {
  id: string;
  name: string;
  age: number | null;
  sex: string | null;
  breed: string | null;
  color: string | null;
  microchip: string | null;
  status: HorseStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface HorsePhoto {
  id: string;
  horse_id: string;
  url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface HorseHealthRecord {
  id: string;
  horse_id: string;
  type: RecordType;
  date: string;
  vet: string | null;
  findings: string | null;
  attachments: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface HorseWeightLog {
  id: string;
  horse_id: string;
  date: string;
  weight_kg: number;
  measured_by: string | null;
  notes: string | null;
  created_at: string;
}

export interface FeedingLog {
  id: string;
  horse_id: string;
  date: string;
  feed_type: string;
  amount: number;
  unit: string;
  notes: string | null;
  created_at: string;
}

export interface RaceRecord {
  id: string;
  horse_id: string;
  race_date: string;
  race_name: string;
  venue: string | null;
  result: string | null;
  prize: number | null;
  currency: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommercialActivityRecord {
  id: string;
  horse_id: string;
  activity_date: string;
  type: string;
  counterparty: string | null;
  amount: number | null;
  currency: string;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface InsurancePolicy {
  id: string;
  horse_id: string;
  provider: string;
  policy_number: string;
  coverage_type: string | null;
  start_date: string;
  end_date: string;
  premium: number | null;
  document_url: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Ownership {
  id: string;
  horse_id: string;
  user_id: string;
  share_percent: number;
  class: string | null;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvestorReport {
  id: string;
  title: string;
  report_type: string;
  period_start: string;
  period_end: string;
  status: ReportStatus;
  published_at: string | null;
  summary: string | null;
  forecast_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReportHorse {
  report_id: string;
  horse_id: string;
}

export interface UploadedDocument {
  id: string;
  horse_id: string | null;
  policy_id: string | null;
  report_id: string | null;
  uploaded_by: string;
  file_url: string;
  file_name: string;
  mime_type: string;
  size_bytes: number | null;
  category: string | null;
  notes: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  horse_id: string | null;
  type: NotificationType;
  title: string;
  body: string | null;
  scheduled_at: string | null;
  sent_at: string | null;
  read_at: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// Database types with relationships
export interface HorseWithRelations extends Horse {
  photos?: HorsePhoto[];
  ownerships?: OwnershipWithUser[];
}

export interface OwnershipWithUser extends Ownership {
  user?: User;
}

export interface InvestorReportWithHorses extends InvestorReport {
  horses?: Horse[];
}
