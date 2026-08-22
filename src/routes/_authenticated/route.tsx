import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { fetchIsAdmin } from "@/lib/admin-session";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });

    let isAdmin = false;
    try {
      isAdmin = await fetchIsAdmin(data.user.id);
    } catch {
      await supabase.auth.signOut();
      throw redirect({ to: "/auth" });
    }

    if (!isAdmin) {
      await supabase.auth.signOut();
      throw redirect({ to: "/auth" });
    }

    return { user: data.user };
  },
  component: () => <Outlet />,
});
