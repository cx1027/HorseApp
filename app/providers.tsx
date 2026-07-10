import { ReactNode } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { UserRoleProvider } from "@/hooks/useUserRole";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <UserRoleProvider>
      {children}
    </UserRoleProvider>
  );
}
