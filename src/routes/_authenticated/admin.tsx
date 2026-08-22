import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
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
        <h1 className="font-display text-2xl font-bold text-primary">Access pending</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your account is signed in but has not been granted admin access to the blood bank
          registry yet. Ask an existing admin to approve your account.
        </p>
        <button
          type="button"
          onClick={signOut}
          className="mt-6 rounded-md border border-border px-4 py-2 text-sm font-semibold"
        >
          Sign out
        </button>
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
                <td className="px-4 py-3 text-right">
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
                    onClick={async () => {
                      if (!window.confirm(`Remove ${d.full_name} from the registry?`)) return;
                      await removeDonor({ data: { id: d.id } });
                      await queryClient.invalidateQueries({ queryKey: ["donors"] });
                    }}
                    className="ml-2 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-destructive"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  No donors match this filter yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}