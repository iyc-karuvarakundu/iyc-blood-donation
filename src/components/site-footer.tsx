import { Link } from "@tanstack/react-router";
import { coordinators } from "@/lib/coordinators";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="h-1 tricolour-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg font-bold">Indian Youth Congress Malappuram</h2>
          <p className="mt-3 text-sm text-primary-foreground/75">
            The youth wing of the Indian National Congress in Malappuram district, Kerala.
            Our volunteer blood network connects patients with willing donors, free of cost,
            round the clock.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/60">
            Campaign organisers: Nizam Karuvarakundu &amp; Rishan
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/donate" className="text-primary-foreground/80 hover:underline">
                Register as a donor
              </Link>
            </li>
            <li>
              <Link to="/need-blood" className="text-primary-foreground/80 hover:underline">
                I need blood urgently
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-primary-foreground/80 hover:underline">
                About Indian Youth Congress
              </Link>
            </li>
            <li>
              <Link to="/auth" className="text-primary-foreground/60 hover:underline">
                Admin login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">Blood help desk</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {coordinators.map((c) => (
              <li key={c.wa} className="text-primary-foreground/80">
                <span className="font-semibold">
                  {c.name} {c.area}
                </span>
                <a href={`tel:${c.tel}`} className="block hover:underline">
                  {c.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Indian Youth Congress Malappuram. Donor details are kept
        strictly confidential and are visible only to authorised coordinators.
      </div>
    </footer>
  );
}