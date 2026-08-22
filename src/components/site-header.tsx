import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/iyc-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/donate", label: "Donate Blood" },
  { to: "/need-blood", label: "Need Blood" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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
          <Link
            to="/donate"
            className="ml-2 rounded-md bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
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
        </nav>
      )}
    </header>
  );
}