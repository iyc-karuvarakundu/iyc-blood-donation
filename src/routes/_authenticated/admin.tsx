import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { deleteDonor, listDonors } from "@/lib/donors.functions";
import { bloodGroups } from "@/lib/coordinators";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Blood Bank Registry — Admin | IYC Malappuram" },
      {
        name: "description",
        content: "Private donor registry for authorised Indian Youth Congress Malappuram admins.",
      },
      { property: "og:title", content: "Blood Bank Registry — Admin" },
      { property: "og:description", content: "Authorised admins only." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-primary">Could not load the registry</h1>
      <p className="mt-2 text-sm text-muted-foreground">Please refresh and try again.</p>
    </div>
  ),
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchDonors = useServerFn(listDonors);
  const removeDonor = useServerFn(deleteDonor);
  const [group, setGroup] = useState("");
  const [search, setSearch] = useState("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["donors"],
    queryFn: () => fetchDonors(),
  });

  const donors = data?.donors ?? [];
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return donors.filter(
      (d) =>
        (!group || d.blood_group === group) &&
        (!q ||
          d.full_name.toLowerCase().includes(q) ||
          d.place.toLowerCase().includes(q) ||
          d.phone.includes(q)),
    );
  }, [donors, group, search]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }
  async function markDonated(id: string, name: string, count: number) {
  if (!window.confirm(`Mark ${name} as donated today?`)) return;
  const { data: updated, error } = await supabase
    .from("donors")
    .update({ last_donated_at: new Date().toISOString(), donation_count: count + 1 })
    .eq("id", id)
    .select("id");
  if (error) {
    window.alert(error.message);
    return;
  }
  if (!updated || updated.length === 0) {
    window.alert("Update blocked. Admin policy or columns missing in Supabase.");
    return;
  }
  await queryClient.invalidateQueries({ queryKey: ["donors"] });
}

  useEffect(() => {
    if (!data || data.isAdmin !== false) return;
    void (async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      void navigate({ to: "/auth", replace: true });
    })();
  }, [data, queryClient, navigate]);

  function exportCsv() {
    const header = ["Name", "Phone", "Email", "Blood group", "District", "Place", "DOB", "Registered"];
    const rows = filtered.map((d) => [
      d.full_name,
      d.phone,
      d.email ?? "",
      d.blood_group,
      d.district,
      d.place,
      d.date_of_birth ?? "",
      new Date(d.created_at).toLocaleDateString(),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "iyc-malappuram-donors.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (isPending) {
    return <p className="mx-auto max-w-6xl px-4 py-16 text-muted-foreground">Loading registry…</p>;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-2xl font-bold text-primary">Registry unavailable</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please refresh and try again.</p>
      </div>
    );
  }

  if (!data?.isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-2xl font-bold text-primary">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only authorized administrators can view the donor registry.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            Confidential
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-primary">Blood bank registry</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {donors.length} registered donor{donors.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={signOut}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, place or phone"
          className="min-w-56 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm"
        />
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="rounded-md border border-input bg-card px-3 py-2 text-sm"
        >
          <option value="">All blood groups</option>
          {bloodGroups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Group</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Place</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Registered</th>
              <th className="px-4 py-3">Last donated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="px-4 py-3 font-semibold text-primary">{d.full_name}</td>
                <td className="px-4 py-3 font-bold text-secondary">{d.blood_group}</td>
                <td className="px-4 py-3">
                  <a href={`tel:${d.phone}`} className="hover:underline">
                    {d.phone}
                  </a>
                </td>
                <td className="px-4 py-3">{d.place}</td>
                <td className="px-4 py-3">{d.district}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(d.created_at).toLocaleDateString()}
                </td>
                   <td className="px-4 py-3 text-muted-foreground">
                      {d.last_donated_at ? (
                        <>
                          {new Date(d.last_donated_at).toLocaleDateString()}
                          <span className="ml-1 text-xs">({d.donation_count ?? 1}x)</span>
                        </>
                      ) : (
                        "Not yet"
                      )}
                    </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <a
                      href={`https://wa.me/${d.phone.replace(/[^0-9]/g, "").replace(/^0+/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-whatsapp px-3 py-1.5 text-xs font-bold text-whatsapp-foreground"
                    >
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => markDonated(d.id, d.full_name, d.donation_count ?? 0)}
                      className="rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
                    >
                      Mark donated
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!window.confirm(`Remove ${d.full_name} from the registry?`)) return;
                        await removeDonor({ data: { id: d.id } });
                        await queryClient.invalidateQueries({ queryKey: ["donors"] });
                      }}
                      className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                </td>
                </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  No donors match this filter yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
          <HeroImagesAdmin />

    </div>
  );
}

type HeroImage = {
  id: string;
  image_url: string;
  storage_path: string;
};

function HeroImagesAdmin() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const { data, error } = await supabase
      .from("hero_images")
      .select("id, image_url, storage_path")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setImages(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: upErr } = await supabase.storage.from("hero-images").upload(path, file);
    if (upErr) {
      setError(upErr.message);
      setUploading(false);
      return;
    }
    const { data: pub } = supabase.storage.from("hero-images").getPublicUrl(path);
    const { error: insErr } = await supabase.from("hero_images").insert({
      image_url: pub.publicUrl,
      storage_path: path,
      sort_order: images.length,
    });
    if (insErr) {
      await supabase.storage.from("hero-images").remove([path]);
      setError(insErr.message);
    } else {
      await load();
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onRemove(img: HeroImage) {
    if (!window.confirm("Remove this hero image?")) return;
    setError("");
    const { error: delErr } = await supabase.from("hero_images").delete().eq("id", img.id);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    await supabase.storage.from("hero-images").remove([img.storage_path]);
    await load();
  }

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            Home page
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-primary">Hero images</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            These images slide on the home page. If none are added, the default images are shown.
          </p>
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onAdd}
            className="hidden"
            id="hero-upload"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Add image"}
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {loading ? (
        <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
      ) : images.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No custom hero images yet. Default images are showing.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-card"
            >
              <img src={img.image_url} alt="Hero" className="aspect-video w-full object-cover" />
              <div className="p-3 text-right">
                <button
                  type="button"
                  onClick={() => onRemove(img)}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-destructive"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}