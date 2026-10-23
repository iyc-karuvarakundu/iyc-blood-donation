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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const totalPages = Math.max(
  1,
  Math.ceil(filtered.length / itemsPerPage)
);

const paginatedDonors = filtered.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

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
           {paginatedDonors.map((d) => (
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
      {totalPages > 1 && (
  <div className="mt-4 flex items-center justify-center gap-4">
    <button
      type="button"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className="rounded-md border px-4 py-2 disabled:opacity-50"
    >
      Previous
    </button>

    <span className="text-sm">
      Page {currentPage} of {totalPages}
    </span>

    <button
      type="button"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      className="rounded-md border px-4 py-2 disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
          <HeroImagesAdmin />
          <EventPhotosAdmin />
          <CoordinatorsAdmin />

    </div>
  );
}

type HeroImage = {
  id: string;
  image_url: string;
  storage_path: string;
  is_hero: boolean;
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
      .select("id, image_url, storage_path, is_hero")
      .eq("is_hero", true)
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
      is_hero: true,
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
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Home page</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-primary">Hero images</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            These images slide on the home page. If none are added, the default images are shown.
          </p>
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" onChange={onAdd} className="hidden" />
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


type EventPhoto = {
  id: string;
  image_url: string;
  storage_path: string;
  caption: string | null;
};

function EventPhotosAdmin() {
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const table = () => (supabase as any).from("event_photos");

  async function load() {
    const { data, error } = await table()
      .select("id, image_url, storage_path, caption")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setPhotos(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setError("");
    setUploading(true);

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError(`${file.name}: not an image.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name}: must be under 5 MB.`);
        continue;
      }
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("event-photos").upload(path, file);
      if (upErr) {
        setError(upErr.message);
        continue;
      }
      const { data: pub } = supabase.storage.from("event-photos").getPublicUrl(path);
      const { error: insErr } = await table().insert({
        image_url: pub.publicUrl,
        storage_path: path,
        caption: caption.trim() || null,
      });
      if (insErr) {
        await supabase.storage.from("event-photos").remove([path]);
        setError(insErr.message);
      }
    }

    setCaption("");
    await load();
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function remove(p: EventPhoto) {
    if (!window.confirm("Permanently delete this photo?")) return;
    setError("");
    const { error: delErr } = await table().delete().eq("id", p.id);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    await supabase.storage.from("event-photos").remove([p.storage_path]);
    await load();
  }

  return (
    <div className="mt-12">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">Gallery page</p>
      <h2 className="mt-1 font-display text-2xl font-bold text-primary">Event photos</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        These photos appear on the public Gallery page.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption (optional)"
          className="min-w-56 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onAdd}
          className="hidden"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Add photos"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {loading ? (
        <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
      ) : photos.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No event photos yet.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-card"
            >
              <img
                src={p.image_url}
                alt={p.caption ?? "Event"}
                className="aspect-video w-full object-cover"
              />
              <div className="flex items-center justify-between gap-2 p-3">
                <span className="truncate text-xs text-muted-foreground">{p.caption ?? ""}</span>
                <button
                  type="button"
                  onClick={() => remove(p)}
                  className="shrink-0 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-destructive"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function CoordinatorsAdmin() {
  const queryClient = useQueryClient();
  const [rows, setRows] = useState<
    { id: string; name: string; area: string; phone: string; sort_order: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", area: "", phone: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const table = () => (supabase as any).from("coordinators");

  async function load() {
    const { data, error } = await table()
      .select("id, name, area, phone, sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function refresh() {
    await load();
    await queryClient.invalidateQueries({ queryKey: ["coordinators"] });
  }

  function resetForm() {
    setForm({ name: "", area: "", phone: "" });
    setEditId(null);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name) return setError("Name is required.");
    if (phone.replace(/\D/g, "").length < 10) return setError("Enter a valid phone number.");
    setBusy(true);
    const payload = { name, area: form.area.trim(), phone };
    const { error: err } = editId
      ? await table().update(payload).eq("id", editId)
      : await table().insert({
          ...payload,
          sort_order: rows.length ? Math.max(...rows.map((r) => r.sort_order)) + 1 : 0,
        });
    setBusy(false);
    if (err) return setError(err.message);
    resetForm();
    await refresh();
  }

  async function onRemove(r: { id: string; name: string }) {
    if (!window.confirm(`Remove ${r.name} from coordinators?`)) return;
    setError("");
    const { error: err } = await table().delete().eq("id", r.id);
    if (err) return setError(err.message);
    await refresh();
  }

  async function move(index: number, dir: -1 | 1) {
    const other = rows[index + dir];
    const current = rows[index];
    if (!other) return;
    setError("");
    const reordered = [...rows];
    reordered[index] = other;
    reordered[index + dir] = current;
    const results = await Promise.all(
      reordered.map((r, i) => table().update({ sort_order: i }).eq("id", r.id)),
    );
    const failed = results.find((r: { error: { message: string } | null }) => r.error);
    if (failed?.error) setError(failed.error.message);
    await refresh();
  }

  return (
    <div className="mt-12">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
        Need Blood page
      </p>
      <h2 className="mt-1 font-display text-2xl font-bold text-primary">Coordinators</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        These people are shown on the public Need Blood help desk.
      </p>

      <form onSubmit={onSave} className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="min-w-40 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm"
        />
        <input
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          placeholder="Area (optional)"
          className="min-w-40 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm"
        />
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone e.g. +91 96337 25868"
          inputMode="tel"
          className="min-w-48 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Saving…" : editId ? "Update" : "Add coordinator"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={resetForm}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
          >
            Cancel
          </button>
        )}
      </form>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {loading ? (
        <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No coordinators yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card shadow-card">
          <table className="w-full text-left text-sm">
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className="border-t border-border first:border-t-0">
                  <td className="px-4 py-3 font-semibold text-primary">{r.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.area || "—"}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <button
                        type="button"
                        disabled={i === 0}
                        onClick={() => move(i, -1)}
                        aria-label="Move up"
                        className="rounded-md border border-border px-2 py-1.5 text-xs disabled:opacity-40"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={i === rows.length - 1}
                        onClick={() => move(i, 1)}
                        aria-label="Move down"
                        className="rounded-md border border-border px-2 py-1.5 text-xs disabled:opacity-40"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditId(r.id);
                          setForm({ name: r.name, area: r.area, phone: r.phone });
                        }}
                        className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(r)}
                        className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}