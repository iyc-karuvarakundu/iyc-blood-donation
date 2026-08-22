import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  ACCESS_DENIED_DETAIL,
  ACCESS_DENIED_TITLE,
  fetchIsAdmin,
  isInvalidCredentialsError,
} from "@/lib/admin-session";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Login | IYC Malappuram Blood Bank" },
      {
        name: "description",
        content:
          "Secure administrator login for Indian Youth Congress Malappuram Blood Bank coordinators.",
      },
      { property: "og:title", content: "Admin Login | IYC Malappuram Blood Bank" },
      {
        property: "og:description",
        content: "Authorised administrators only. Donor data is confidential.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const credentials = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Enter your username")
    .max(64)
    .regex(/^[A-Za-z0-9._-]+$/, "Username can use letters, numbers, . _ - only"),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

const USERNAME_DOMAIN = "@iycblood.local";
const toEmail = (username: string) => username.toLowerCase() + USERNAME_DOMAIN;

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void supabase.auth.getSession().then(async ({ data }) => {
      const userId = data.session?.user.id;
      if (!userId) return;
      try {
        const isAdmin = await fetchIsAdmin(userId);
        if (cancelled) return;
        if (isAdmin) {
          void navigate({ to: "/admin", replace: true });
          return;
        }
        await supabase.auth.signOut();
      } catch {
        if (!cancelled) await supabase.auth.signOut();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function denyAndSignOut() {
    await supabase.auth.signOut();
    setDenied(true);
    setError("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setDenied(false);
    const raw = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const parsed = credentials.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your details");
      return;
    }

    setBusy(true);
    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: toEmail(parsed.data.username),
        password: parsed.data.password,
      });

      if (signInError) {
        await supabase.auth.signOut();
        if (isInvalidCredentialsError(signInError)) {
          setError("Wrong username or password.");
        } else {
          setError("Unable to sign in right now. Please try again.");
        }
        return;
      }

      const userId = signInData.user?.id;
      if (!userId) {
        await supabase.auth.signOut();
        setError("Unable to sign in right now. Please try again.");
        return;
      }

      let isAdmin = false;
      try {
        isAdmin = await fetchIsAdmin(userId);
      } catch {
        await supabase.auth.signOut();
        setError("Unable to sign in right now. Please try again.");
        return;
      }

      if (!isAdmin) {
        await denyAndSignOut();
        return;
      }

      void navigate({ to: "/admin", replace: true });
    } catch {
      await supabase.auth.signOut();
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="flex items-center gap-2 text-primary">
        <Lock className="h-5 w-5" aria-hidden />
        <h1 className="font-display text-2xl font-bold">Admin login</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        This portal is for authorised IYC Malappuram Blood Bank administrators and coordinators
        only. There is no public signup.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6 shadow-card"
      >
        <div>
          <label htmlFor="username" className="text-sm font-semibold text-primary">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoCapitalize="characters"
            autoComplete="username"
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-semibold text-primary">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        {denied && (
          <div
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            <p className="font-semibold">{ACCESS_DENIED_TITLE}</p>
            <p className="mt-1 font-normal text-destructive/90">{ACCESS_DENIED_DETAIL}</p>
          </div>
        )}

        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-primary px-5 py-3 font-display font-bold text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Please wait…" : "Sign in"}
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Accounts are created only by the campaign admin. Contact the organisers if you need
          access.
        </p>
      </form>
    </div>
  );
}
