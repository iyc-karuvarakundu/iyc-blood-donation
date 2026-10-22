import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Indian Youth Congress Malappuram" },
      {
        name: "description",
        content: "Photos from Indian Youth Congress Malappuram blood donation events.",
      },
    ],
  }),
  component: GalleryPage,
});

type EventPhoto = { id: string; image_url: string; caption: string | null };

function GalleryPage() {
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<EventPhoto | null>(null);

  useEffect(() => {
    (supabase as any)
      .from("event_photos")
      .select("id, image_url, caption")
      .order("created_at", { ascending: false })
      .then(({ data }: { data: EventPhoto[] | null }) => {
        setPhotos(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Our events</p>
      <h1 className="mt-1 font-display text-3xl font-bold text-primary">Gallery</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Moments from our blood donation camps and community events.
      </p>

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
      ) : photos.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No photos yet. Please check back soon.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="group overflow-hidden rounded-xl border border-border bg-card text-left shadow-card"
            >
              <img
                src={p.image_url}
                alt={p.caption ?? "Event photo"}
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {p.caption && <p className="p-3 text-sm text-foreground/80">{p.caption}</p>}
            </button>
          ))}
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <img
            src={active.image_url}
            alt={active.caption ?? "Event photo"}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
}