import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, LogOut, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/iyc-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { fetchIsAdmin } from "@/lib/admin-session";

const links = [
  { to: "/", label: "Home" },
  { to: "/donate", label: "Donate Blood" },
  { to: "/need-blood", label: "Need Blood" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function syncAdmin(userId: string | undefined) {
      if (!userId) {
        if (!cancelled) setIsAdmin(false);
        return;
      }
      try {
        const admin = await fetchIsAdmin(userId);
        if (!cancelled) setIsAdmin(admin);
      } catch {
        if (!cancelled) setIsAdmin(false);
      }
    }

    void supabase.auth.getSession().then(({ data }) => {
      void syncAdmin(data.session?.user.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncAdmin(session?.user.id);
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    setOpen(false);
    setIsAdmin(false);
    await supabase.auth.signOut();
    void navigate({ to: "/", replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="h-1 tricolour-rule" />
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Indian Youth Congress Malappuram logo"
            width={48}
            height={48}
            className="h-11 w-11"
          />
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold uppercase tracking-wide text-primary sm:text-base">
              Indian Youth Congress
            </span>
            <span className="block text-xs uppercase tracking-[0.2em] text-secondary">
              Malappuram
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-muted text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-primary/25 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted"
              >
                <Shield className="h-3.5 w-3.5" aria-hidden />
                Admin
              </Link>
              <button
                type="button"
                onClick={() => void signOut()}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:bg-muted"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-primary/20 px-3 py-2 text-sm font-semibold text-primary/80 transition-colors hover:bg-muted hover:text-primary"
            >
              <Lock className="h-3.5 w-3.5" aria-hidden />
              Admin Login
            </Link>
          )}
          <Link
            to="/donate"
            className="ml-1 rounded-md bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
          >
            Register as Donor
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-md border border-border px-3 py-2 text-sm font-semibold md:hidden"
        >
          Menu
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-card px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-3 text-sm font-semibold text-foreground/85"
            >
              {l.label}
            </Link>
          ))}
          {isAdmin ? (
            <>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-2 py-3 text-sm font-semibold text-primary"
              >
                <Shield className="h-4 w-4" aria-hidden />
                Admin Dashboard
              </Link>
              <button
                type="button"
                onClick={() => void signOut()}
                className="flex w-full items-center gap-2 rounded-md px-2 py-3 text-left text-sm font-semibold text-foreground/80"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-2 py-3 text-sm font-semibold text-primary/85"
            >
              <Lock className="h-4 w-4" aria-hidden />
              Admin Login
            </Link>
          )}
          <Link
            to="/donate"
            onClick={() => setOpen(false)}
            className="mt-1 mb-2 block rounded-md bg-secondary px-3 py-2.5 text-center text-sm font-bold text-secondary-foreground"
          >
            Register as Donor
          </Link>
        </nav>
      )}
    </header>
  );
}
