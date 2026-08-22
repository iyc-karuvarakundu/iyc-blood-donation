import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Indian Youth Congress Malappuram | Blood Donation Wing" },
      {
        name: "description",
        content:
          "The Indian Youth Congress is the youth wing of the Indian National Congress, founded in 1960. Learn about our Malappuram unit and its volunteer blood donation network.",
      },
      { property: "og:title", content: "About Indian Youth Congress Malappuram" },
      {
        property: "og:description",
        content:
          "The youth wing of the Indian National Congress in Malappuram district, running a volunteer blood donor network.",
      },
    ],
  }),
  component: AboutPage,
});

const facts = [
  { label: "Indian National Congress founded", value: "1885" },
  { label: "Indian Youth Congress founded", value: "1960" },
  { label: "Party symbol", value: "Hand" },
  { label: "Our district unit", value: "Malappuram, Kerala" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">About us</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
        Indian Youth Congress, Malappuram
      </h1>

      <div className="mt-6 space-y-5 text-foreground/85">
        <p>
          The <strong>Indian National Congress</strong> is one of India's two major national
          political parties. Founded in 1885, it led the Indian independence movement and has
          since governed the country for much of its post-independence history. Its recognised
          election symbol is the open <strong>hand</strong>, and its politics are rooted in
          secularism, social justice and inclusive development.
        </p>
        <p>
          The <strong>Indian Youth Congress (IYC)</strong>, established in 1960, is the youth
          wing of the Indian National Congress. It organises young Indians for political and
          social action — from public campaigns and civic issues to relief work, disaster
          response, and health drives such as blood donation camps.
        </p>
        <p>
          Our <strong>Malappuram district unit</strong> runs this volunteer blood donor network
          across Malappuram — Manjeri, Perinthalmanna, Karuvarakundu, Nilambur, Tirur, Kondotty,
          Ponnani and beyond. Volunteers maintain a confidential register of willing donors and
          connect patients and hospitals to a matching donor at any hour, entirely free of cost.
        </p>
      </div>

      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {f.label}
            </dt>
            <dd className="mt-1 font-display text-xl font-bold text-primary">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 rounded-xl border border-border bg-muted/50 p-6">
        <h2 className="font-display text-xl font-bold text-primary">Campaign organisers</h2>
        <p className="mt-2 text-sm text-foreground/80">
          This blood donation initiative is organised by <strong>Nizam Karuvarakundu</strong>{" "}
          and <strong>Rishan</strong>, along with the district coordinator team.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/donate"
            className="rounded-md bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground"
          >
            Register as a donor
          </Link>
          <Link
            to="/need-blood"
            className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold"
          >
            Contact a coordinator
          </Link>
        </div>
      </div>
    </div>
  );
}