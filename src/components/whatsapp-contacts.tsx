import { coordinators, whatsappHelpLink } from "@/lib/coordinators";

export function WhatsappContacts({
  group,
  compact = false,
}: {
  group?: string | undefined;
  compact?: boolean;
}) {
  return (
    <div
      className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}
    >
      {coordinators.map((c, index) => (
        <article
          key={c.wa}
          className={`rounded-xl border border-border bg-card p-5 shadow-card ${
            compact && coordinators.length % 2 === 1 && index === coordinators.length - 1
              ? "sm:col-span-2"
              : ""
          }`}
        >
          <h3 className="font-display text-lg font-bold text-primary">{c.name}</h3>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{c.area}</p>
          <a
            href={`tel:${c.tel}`}
            className="mt-3 block text-sm font-semibold text-foreground hover:underline"
          >
            {c.display}
          </a>
          <div className="mt-4 flex gap-2">
            <a
              href={whatsappHelpLink(c, group)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-md bg-whatsapp px-3 py-2 text-center text-sm font-bold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${c.tel}`}
              className="rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Call
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
