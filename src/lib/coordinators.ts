import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Coordinator = {
  name: string;
  area: string;
  display: string;
  /** E.164 digits, no plus — used for wa.me links */
  wa: string;
  tel: string;
};

export type CoordinatorRow = {
  id: string;
  name: string;
  area: string;
  phone: string;
  sort_order: number;
};

/** Turns "+91 96337 25868" / "9633725868" into the shape the UI uses. */
export function toCoordinator(row: Pick<CoordinatorRow, "name" | "area" | "phone">): Coordinator {
  let digits = row.phone.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length === 10) digits = `91${digits}`;
  return {
    name: row.name,
    area: row.area,
    display: row.phone.trim(),
    wa: digits,
    tel: `+${digits}`,
  };
}

/** Coordinators managed by admins from the Admin page (Supabase table). */
export function useCoordinators() {
  const [data, setData] = useState<CoordinatorRow[] | undefined>(undefined);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (supabase as any)
      .from("coordinators")
      .select("id, name, area, phone, sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
      .then(({ data, error }: { data: CoordinatorRow[] | null; error: unknown }) => {
        if (cancelled) return;
        if (!error) setData(data ?? []);
        setIsPending(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isPending };
}
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

export const malappuramPlaces = [
  "Malappuram",
  "Manjeri",
  "Perinthalmanna",
  "Karuvarakundu",
  "Mudur",
  "Ariyanthodika",
  "Nilambur",
  "Wandoor",
  "Kondotty",
  "Tirur",
  "Tirurangadi",
  "Ponnani",
  "Kottakkal",
  "Edappal",
  "Melattur",
  "Mankada",
  "Areekode",
  "Vazhakkad",
  "Vengara",
  "Parappanangadi",
  "Valanchery",
  "Kuttippuram",
  "Thootha",
  "Pandikkad",
  "Other",
] as const;

export function whatsappHelpLink(c: Coordinator, group?: string | undefined) {
  const text = group
    ? `Hello ${c.name}, I urgently need ${group} blood. Can you help me through the Indian Youth Congress Malappuram blood bank?`
    : `Hello ${c.name}, I urgently need blood. Can you help me through the Indian Youth Congress Malappuram blood bank?`;
  return `https://wa.me/${c.wa}?text=${encodeURIComponent(text)}`;
}