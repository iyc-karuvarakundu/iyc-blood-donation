import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: data === true };
  });

export const listDonors = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (isAdmin !== true) {
      return { isAdmin: false as const, donors: [] };
    }

    const { data, error } = await context.supabase
      .from("donors")
      .select("id, full_name, phone, email, blood_group, district, place, date_of_birth, notes, created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { isAdmin: true as const, donors: data ?? [] };
  });

export const deleteDonor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (isAdmin !== true) throw new Error("Forbidden");
    const { error } = await context.supabase.from("donors").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
