import action from '@/assets/action.webp';
import hero from "@/assets/hero.webp";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Droplet,
  HeartHandshake,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Syringe,
  UsersRound,
} from "lucide-react";
import logo from "@/assets/iyc-logo.png";
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

const reasons = [
  {
    icon: HeartPulse,
    title: "Every drop matters",
    body: "A voluntary donor can be there when a patient and their family need support the most.",
  },
  {
    icon: Syringe,
    title: "Help during emergencies",
    body: "Blood can be needed in emergencies, accidents, surgeries, and ongoing medical care.",
  },
  {
    icon: HeartHandshake,
    title: "Support patients & families",
    body: "A timely connection can ease the search for help during a difficult moment.",
  },
  {
    icon: UsersRound,
    title: "Be a voluntary donor",
    body: "Join a local network of people willing to step forward when their blood group is needed.",
  },
];

const steps = [
  {
    number: "01",
    title: "Register",
    body: "Share your donor details, blood group, and place through our confidential registration form.",
  },
  {
    number: "02",
    title: "Connect",
    body: "When a matching group is needed, authorised coordinators can contact suitable donors.",
  },
  {
    number: "03",
    title: "Help save a life",
    body: "A voluntary donation can make a meaningful difference to someone in need.",
  },
];

const trustPoints = [
  {
    icon: UsersRound,
    title: "Voluntary registration",
    body: "Donors choose to join the network through the dedicated registration page.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential details",
    body: "Donor details are handled confidentially and are available only to authorised coordinators.",
  },
  {
    icon: HeartHandshake,
    title: "Coordinator-assisted help",
    body: "People seeking blood can reach local coordinators directly for assistance.",
  },
  {
    icon: MapPin,
    title: "Focused on Malappuram",
    body: "The network is built to connect volunteers and people seeking help across Malappuram.",
  },
];

const iycActionCards = [
  {
    icon: UsersRound,
    title: "Community",
    body: "Youth coming together to support people and communities.",
  },
  {
    icon: HeartHandshake,
    title: "Service",
    body: "Turning volunteer energy into meaningful action.",
  },
  {
    icon: Droplet,
    title: "Blood Donation",
    body: "Connecting voluntary donors with people who urgently need blood.",
    featured: true,
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`text-xs font-bold uppercase tracking-[0.25em] ${
          light ? "text-accent" : "text-secondary"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-bold sm:text-4xl ${
          light ? "text-primary-foreground" : "text-primary"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-7 ${
          light ? "text-primary-foreground/75" : "text-muted-foreground"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function Index() {
  return (
    <div className="overflow-hidden">
      <style>{`
        @keyframes home-hero-drift {
          from { transform: scale(1.04) translate3d(-0.6%, -0.4%, 0); }
          to { transform: scale(1.1) translate3d(0.6%, 0.4%, 0); }
        }
        @keyframes home-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes home-section-reveal {
          from { transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @supports (animation-timeline: view()) {
          .home-reveal {
            animation: home-section-reveal linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 28%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-reveal { animation: none !important; }
        }
      `}</style>

      <section className="relative isolate min-h-[640px] overflow-hidden sm:min-h-[700px]">
        <img
          src={hero}
          alt="Volunteers and a nurse at an Indian Youth Congress blood donation camp"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[home-hero-drift_16s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 hero-overlay" />
        <Droplet
          className="pointer-events-none absolute right-[8%] top-24 h-16 w-16 text-accent/30 motion-safe:animate-[home-float_6s_ease-in-out_infinite] sm:h-24 sm:w-24"
          aria-hidden
        />
        <Droplet
          className="pointer-events-none absolute bottom-16 right-[24%] h-8 w-8 text-primary-foreground/20 motion-safe:animate-[home-float_7s_ease-in-out_infinite]"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[640px] max-w-6xl items-center px-4 py-24 sm:min-h-[700px] sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex animate-in fade-in slide-in-from-bottom-3 items-center gap-3 duration-700">
              <img
                src={logo}
                alt="Indian Youth Congress logo"
                width={52}
                height={52}
                className="h-12 w-12 rounded-full bg-primary-foreground/10 p-1.5 ring-1 ring-primary-foreground/25"
              />
              <p className="text-xs font-bold uppercase tracking-[0.27em] text-accent sm:text-sm">
                Indian Youth Congress · Malappuram
              </p>
            </div>

            <h1 className="mt-7 animate-in fade-in slide-in-from-bottom-4 font-display text-4xl font-bold leading-[1.05] text-primary-foreground duration-700 sm:text-6xl lg:text-7xl">
              One donation can give someone another tomorrow.
            </h1>

            <p className="mt-6 max-w-2xl animate-in fade-in slide-in-from-bottom-5 text-base leading-7 text-primary-foreground/85 delay-150 duration-700 sm:text-lg">
              A blood donation initiative by Indian Youth Congress Malappuram, connecting voluntary
              blood donors with people who need help — with community, care, and compassion at its
              heart.
            </p>

            <div className="mt-9 flex animate-in fade-in slide-in-from-bottom-5 flex-col gap-3 delay-200 duration-700 sm:flex-row">
              <Link
                to="/donate"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-3.5 font-display text-base font-bold text-secondary-foreground shadow-lift transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Become a Donor
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link
                to="/need-blood"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/35 bg-primary/35 px-6 py-3.5 font-display text-base font-bold text-primary-foreground backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-primary/55"
              >
                Need Blood Now
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-reveal relative border-b border-border bg-primary px-4 py-12 text-primary-foreground sm:py-14">
        <div className="absolute inset-x-0 top-0 h-1 tricolour-rule" />
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-primary-foreground/15 lg:border-r lg:pr-6">
            <p className="font-display text-4xl font-bold text-accent">8</p>
            <p className="mt-1 text-sm font-semibold">Blood groups</p>
            <p className="mt-1 text-xs leading-5 text-primary-foreground/65">
              Included in the donor network.
            </p>
          </div>
          <div className="border-primary-foreground/15 lg:border-r lg:pr-6">
            <p className="font-display text-xl font-bold">Voluntary registry</p>
            <p className="mt-2 text-xs leading-5 text-primary-foreground/65">
              A dedicated place for willing donors to register.
            </p>
          </div>
          <div className="border-primary-foreground/15 lg:border-r lg:pr-6">
            <p className="font-display text-xl font-bold">Local support</p>
            <p className="mt-2 text-xs leading-5 text-primary-foreground/65">
              Focused on connecting people across Malappuram.
            </p>
          </div>
          <div>
            <p className="font-display text-xl font-bold">Urgent help</p>
            <p className="mt-2 text-xs leading-5 text-primary-foreground/65">
              Coordinators can be contacted directly when blood is needed.
            </p>
          </div>
        </div>
      </section>

      <section className="home-reveal mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-5 rounded-[2rem] bg-accent/15 blur-2xl" />
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-lift">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[2.5rem] rounded-tr-3xl bg-secondary/10" />
              <img
                src={logo}
                alt="Indian Youth Congress logo"
                width={180}
                height={180}
                className="mx-auto h-40 w-40 object-contain sm:h-44 sm:w-44"
              />
              <div className="mt-7 h-1 tricolour-rule" />
              <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.22em] text-secondary">
                Indian Youth Congress
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Indian Youth Congress · Malappuram"
              title="Youth participation, community engagement, and service."
              description="Indian Youth Congress (IYC) is the youth wing of the Indian National Congress. It brings together the energy of young people with a commitment to community participation and service. In Malappuram, that spirit of volunteering extends to helping people in critical moments through voluntary blood donation and emergency blood support."
            />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Volunteer participation",
                "Community-oriented support",
                "Blood donation awareness",
                "Emergency assistance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg bg-muted/60 px-4 py-3 text-sm font-semibold text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary"
            >
              Learn more about IYC
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-reveal relative overflow-hidden bg-primary px-4 py-20 text-primary-foreground sm:py-28">
        <div className="absolute inset-x-0 top-0 h-1 tricolour-rule" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-success/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="IYC in action"
            title="From youth participation to community service."
            description="The IYC Malappuram blood donation initiative keeps its focus on a direct, practical form of service: making it easier for volunteers to step forward when someone needs blood."
            centered
            light
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {iycActionCards.map(({ icon: Icon, title, body, featured }) => (
              <article
                key={title}
                className={
                  featured
                    ? "group relative isolate min-h-72 overflow-hidden rounded-2xl border border-primary-foreground/20 p-7 shadow-lift"
                    : "card-hover group relative min-h-72 overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-7 backdrop-blur"
                }
              >
                {featured ? (
                  <>
                    <img
                      src={hero}
                      alt="Volunteers at a blood donation camp"
                      width={1920}
                      height={1088}
                      className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 -z-10 bg-primary/85" />
                  </>
                ) : (
                  <img
                    src={logo}
                    alt=""
                    width={180}
                    height={180}
                    className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 opacity-15 transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/25">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="absolute inset-x-7 bottom-7">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                    IYC Malappuram
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold">{title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-primary-foreground/75">
                    {body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-reveal border-y border-border bg-muted/45 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Why blood donation matters"
            title="Your willingness to help can reach far beyond one moment."
            description="Blood is needed in many critical situations. By joining as a voluntary donor, you make it easier for coordinators to reach out when a matching blood group may be needed."
            centered
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="card-hover rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-reveal mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <SectionHeading
          eyebrow="The IYC blood network"
          title="A simple path from willingness to help."
          description="The network is designed to make it clear how donors can register and how people seeking blood can reach the coordinator team."
          centered
        />
        <ol className="relative mt-12 grid gap-5 md:grid-cols-3">
          <span
            className="absolute left-[16%] right-[16%] top-11 hidden h-px bg-border md:block"
            aria-hidden
          />
          {steps.map((step) => (
            <li
              key={step.number}
              className="card-hover relative rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <span className="relative inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-secondary font-display text-lg font-bold text-secondary-foreground ring-8 ring-background">
                {step.number}
              </span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-secondary">
                Step {step.number}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-primary">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-reveal relative overflow-hidden bg-primary px-4 py-20 text-primary-foreground sm:py-24">
        <div className="absolute inset-x-0 top-0 h-1 tricolour-rule" />
        <div className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-52 w-52 rounded-full bg-success/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Blood group availability"
            title="Every blood group matters."
            description="The network aims to maintain voluntary donors across all major blood groups, so coordinators can seek the right support when it is needed."
            centered
            light
          />
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {bloodGroups.map((group) => (
              <li
                key={group}
                className="group rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-6 text-center backdrop-blur transition-all hover:-translate-y-1 hover:border-accent/70 hover:bg-primary-foreground/15"
              >
                <Droplet
                  className="mx-auto h-5 w-5 text-accent transition-transform group-hover:scale-110"
                  aria-hidden
                />
                <span className="mt-3 block font-display text-2xl font-bold text-primary-foreground">
                  {group}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-reveal mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="overflow-hidden rounded-3xl border border-secondary/25 bg-secondary/[0.07] shadow-card lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative bg-secondary p-8 text-secondary-foreground sm:p-12">
            <div className="absolute inset-x-0 top-0 h-1 bg-accent" />
            <Clock3 className="h-10 w-10 text-accent" aria-hidden />
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-secondary-foreground/75">
              Urgent blood help
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight">
              Need blood urgently?
            </h2>
            <p className="mt-5 max-w-md leading-7 text-secondary-foreground/85">
              If you or someone you know needs blood, reach our coordinators for assistance. They
              can be contacted directly by WhatsApp or phone.
            </p>
            <Link
              to="/need-blood"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Find Blood / Get Help
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
          <div className="p-6 sm:p-10">
            <p className="text-sm font-semibold text-primary">Contact the blood help desk</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Choose a coordinator to call or message on WhatsApp.
            </p>
            <div className="mt-6">
              <WhatsappContacts compact />
            </div>
          </div>
        </div>
      </section>

      <section className="home-reveal border-y border-border bg-muted/45 px-4 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="IYC visual story"
              title="Youth Power. Community Service. Saving Lives."
              description="Volunteering can take many forms. Blood donation is one direct way to help someone in a critical moment — a donor steps forward, a coordinator helps connect them, and a community responds with care."
            />
            <div className="mt-8 flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
              <img
                src={logo}
                alt="Indian Youth Congress logo"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-contain"
              />
              <p className="text-sm leading-6 text-muted-foreground">
                Powered by the community-service spirit of Indian Youth Congress Malappuram.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <img
              src={action}
              alt="A donor, volunteer, and medical professional at a blood donation camp"
              width={1920}
              height={1088}
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                Blood donation in action
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold">
                A direct way for volunteers to help someone in a critical moment.
              </h3>
              <Link
                to="/donate"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-foreground hover:text-accent"
              >
                Join the donor network
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-reveal mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <SectionHeading
          eyebrow="Powered by the spirit of Indian Youth Congress"
          title="A blood donation initiative built around community care."
          description="IYC Malappuram connects its community-service spirit with practical blood-donation support: voluntary registration, coordinator-assisted connections, and confidential donor information."
          centered
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="card-hover rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <Icon className="h-5 w-5 text-success" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-reveal mx-auto max-w-6xl px-4 pb-4 sm:pb-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-lift sm:px-12 sm:py-20">
          <div className="absolute inset-x-0 top-0 h-1 tricolour-rule" />
          <Droplet
            className="pointer-events-none absolute left-[8%] top-10 h-12 w-12 text-accent/25"
            aria-hidden
          />
          <Droplet
            className="pointer-events-none absolute bottom-9 right-[10%] h-16 w-16 text-primary-foreground/10"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Indian Youth Congress · Malappuram
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Be someone&apos;s hope.
            </h2>
            <p className="mt-5 text-base leading-7 text-primary-foreground/80">
              Become a voluntary donor today, or reach the help desk when someone needs blood.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/donate"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-3.5 font-display font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Register as a Donor
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link
                to="/need-blood"
                className="inline-flex items-center justify-center rounded-md border border-primary-foreground/30 px-6 py-3.5 font-display font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Need Blood?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}






