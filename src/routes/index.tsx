import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-blood-camp.jpg";
import { WhatsappContacts } from "@/components/whatsapp-contacts";
import { bloodGroups } from "@/lib/coordinators";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blood Donation — Indian Youth Congress Malappuram" },
      {
        name: "description",
        content:
          "A volunteer blood donor network by Indian Youth Congress Malappuram. Register as a donor, or WhatsApp a coordinator when you urgently need blood.",
      },
      { property: "og:title", content: "Blood Donation — Indian Youth Congress Malappuram" },
      {
        property: "og:description",
        content:
          "Register as a blood donor or reach a coordinator on WhatsApp for urgent blood requirements in Malappuram.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  {
    title: "Register once",
    body: "Add your name, blood group and place to our confidential donor register.",
  },
  {
    title: "We call when needed",
    body: "When a patient near you needs your group, a coordinator contacts you directly.",
  },
  {
    title: "You save a life",
    body: "One donation can help up to three patients. It takes less than an hour.",
  },
];

function Index() {
  return (
    <div>
      <section className="relative isolate">
        <img
          src={hero}
          alt="Volunteers and a nurse at an Indian Youth Congress blood donation camp"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Indian Youth Congress · Malappuram
          </p>

          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold text-primary-foreground sm:text-5xl">
           One donation can give someone one more tomorrow
          </h1>

          <p className="mt-5 max-w-xl text-base text-primary-foreground/85">
            A few minutes of your time can make a life-changing difference. Register as a voluntary
            blood donor and help us connect patients in need with the right donor across Malappuram
            — 24/7 and completely free.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/donate"
              className="rounded-md bg-secondary px-6 py-3 font-display text-base font-bold text-secondary-foreground transition-opacity hover:opacity-90"
            >
              Register as a Donor
            </Link>

            <Link
              to="/need-blood"
              className="rounded-md border border-primary-foreground/40 bg-primary/40 px-6 py-3 font-display text-base font-bold text-primary-foreground backdrop-blur transition-colors hover:bg-primary/60"
            >
              I Need Blood Now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
          Every group matters
        </h2>
        <p className="mt-2 text-muted-foreground">
          We keep donors registered across all eight blood groups, in every corner of Malappuram
          district.
        </p>
        <ul className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {bloodGroups.map((g) => (
            <li
              key={g}
              className="rounded-lg border border-border bg-card py-4 text-center font-display text-lg font-bold text-secondary shadow-card"
            >
              {g}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">How it works</h2>
          <ol className="mt-6 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-display font-bold text-secondary-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
          Blood help desk — call or WhatsApp
        </h2>
        <p className="mt-2 text-muted-foreground">
          Patients and relatives can reach any of our coordinators directly.
        </p>
        <div className="mt-8">
          <WhatsappContacts />
        </div>
      </section>
    </div>
  );
}
