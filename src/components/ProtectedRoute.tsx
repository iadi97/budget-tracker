import { ReactNode } from "react";
import { Session } from "@supabase/supabase-js";

type Props = {
  session: Session | null;
  children: ReactNode;
};

export default function ProtectedRoute({ session, children }: Props) {
  if (!session) return null;
  return <>{children}</>;
}
