import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { WhatsappContacts } from "@/components/whatsapp-contacts";
import { bloodGroups } from "@/lib/coordinators";

export const Route = createFileRoute("/need-blood")({
  head: () => ({
    meta: [
      { title: "Need Blood Urgently? Contact Our Coordinators | IYC Malappuram" },
      {
        name: "description",
        content:
          "Need blood in Malappuram? WhatsApp or call an Indian Youth Congress Malappuram blood coordinator directly, any time of day.",
      },
      { property: "og:title", content: "Need Blood Urgently? — IYC Malappuram" },
      {
        property: "og:description",
        content:
          "Reach an Indian Youth Congress Malappuram blood coordinator on WhatsApp for urgent donor support.",
      },
    ],
  }),
  component: NeedBloodPage,
});

function NeedBloodPage() {
  const [group, setGroup] = useState("");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
        24×7 Help Desk
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
        Need blood urgently?
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Message any coordinator below on WhatsApp with the patient's blood group, hospital and
        city. Our volunteers will search the donor registry and connect you with a matching
        donor as fast as possible. This service is completely free.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-muted/50 p-4">
        <label htmlFor="group" className="text-sm font-semibold text-primary">
          Blood group needed
        </label>
        <select
          id="group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="rounded-md border border-input bg-card px-3 py-2 text-sm"
        >
          <option value="">Not sure / any</option>
          {bloodGroups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <span className="text-xs text-muted-foreground">
          We pre-fill your WhatsApp message with this group.
        </span>
      </div>

      <div className="mt-8">
        <WhatsappContacts group={group || undefined} />
      </div>

      <div className="mt-12 rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="font-display text-xl font-bold text-primary">
          Want to help someone else?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your name to the donor registry so our coordinators can reach you the next time a
          patient needs your blood group.
        </p>
        <Link
          to="/donate"
          className="mt-4 inline-block rounded-md bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground"
        >
          Register as a donor
        </Link>
      </div>
    </div>
  );
}