import { supabase } from "@/integrations/supabase/client";

export const ACCESS_DENIED_TITLE =
  "Access denied. Only authorized administrators can login.";
export const ACCESS_DENIED_DETAIL =
  "This login is restricted to authorized IYC Malappuram Blood Bank coordinators.";

export function isInvalidCredentialsError(error: { message?: string; code?: string; status?: number }) {
  const code = error.code?.toLowerCase() ?? "";
  const message = error.message?.toLowerCase() ?? "";
  return (
    code === "invalid_credentials" ||
    message.includes("invalid login credentials") ||
    message.includes("invalid email or password")
  );
}

/** Confirms admin via public.user_roles and has_role(). Throws on Supabase errors. */
export async function fetchIsAdmin(userId: string): Promise<boolean> {
  const { data: roleRow, error: tableError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (tableError) throw tableError;

  const { data: hasRole, error: rpcError } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });

  if (rpcError) throw rpcError;

  return roleRow?.role === "admin" && hasRole === true;
}
