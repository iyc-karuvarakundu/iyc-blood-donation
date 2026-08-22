import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Coordinator Login | IYC Malappuram Blood Bank" },
      {
        name: "description",
        content:
          "Secure login for Indian Youth Congress Malappuram coordinators to access the blood donor registry.",
      },
      { property: "og:title", content: "Coordinator Login | IYC Malappuram Blood Bank" },
      {
        property: "og:description",
        content: "Authorised coordinators only. Donor data is confidential.",
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

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const raw = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const parsed = credentials.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your details");
      return;
    }

    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: toEmail(parsed.data.username),
      password: parsed.data.password,
    });
    setBusy(false);
    if (signInError) {
      setError("Wrong username or password");
      return;
    }
    void navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-primary">Coordinator login</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Donor data is confidential and visible only to authorised admins.
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