import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";


import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  HeartPulse,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import hero from "@/assets/hero.webp";
import iycLogo from "@/assets/iyc-logo.png";
import { WhatsappContacts } from "@/components/whatsapp-contacts";
import { bloodGroups } from "@/lib/coordinators";

export const Route = createFileRoute("/")({
  codeSplitGroupings: [],
  head: () => ({
    meta: [
      {
        title: "Blood Donation — Indian Youth Congress Malappuram",
      },
      {
        name: "description",
        content:
          "A volunteer blood donor network by Indian Youth Congress Malappuram. Register as a donor, or contact a coordinator when you urgently need blood.",
      },
      {
        property: "og:title",
        content: "Blood Donation — Indian Youth Congress Malappuram",
      },
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
    number: "01",
    title: "Register once",
    body: "Add your name, blood group and place to our confidential donor register.",
  },
  {
    number: "02",
    title: "We contact you",
    body: "When a patient needs your blood group, a coordinator contacts you directly.",
  },
  {
    number: "03",
    title: "You help save a life",
    body: "Your voluntary donation can make a life-changing difference to someone in need.",
  },
];

const reasons: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: HeartPulse,
    title: "Every drop matters",
    body: "A voluntary donor can offer meaningful support when a patient and family need it most.",
  },
  {
    icon: UsersRound,
    title: "A local network",
    body: "A shared donor register helps authorised coordinators look for suitable support across Malappuram.",
  },
  {
    icon: HeartHandshake,
    title: "Community care",
    body: "Small acts of service can make the search for blood feel less difficult during an emergency.",
  },
];

type HeroSlide = { src: string; alt: string; position: string };

function Index() {
  const [slide, setSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
   useEffect(() => {
    supabase
      .from("hero_images")
      .select("image_url")
      .eq("is_hero", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHeroSlides(
            data.map((d) => ({
              src: d.image_url,
              alt: "Indian Youth Congress",
              position: "center 30%",
            })),
          );
          setSlide(0);
        }
      });
  }, []);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  

  return (
    <div className="overflow-hidden">

   
      {/* HERO */}
      <section className="relative isolate min-h-[42rem] w-full overflow-hidden bg-primary md:aspect-[8/3] md:min-h-[34rem]">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            aria-hidden={i !== slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === slide ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* Desktop blurred background */}
            <img
              src={s.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 hidden h-full w-full scale-110 object-cover blur-2xl md:block"
            />

            {/* Main hero image: right side on mobile, full image on desktop */}
            <img
              src={s.src}
              alt={s.alt}
              width={1920}
              height={720}
              className="absolute inset-0 h-full w-full object-cover object-right md:object-contain md:object-center"
            />
          </div>
        ))}

        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-primary/70 md:hidden" />

        {/* Desktop overlay */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-primary via-primary/80 to-transparent md:block" />

        {/* Hero content */}
        <div className="relative mx-auto flex min-h-[42rem] max-w-6xl items-center px-5 py-12 text-primary-foreground sm:px-8 md:h-full md:min-h-0 md:px-4 md:py-12">
          <div className="w-full max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs sm:tracking-[0.3em]">
              Indian Youth Congress · Malappuram
            </p>

            <h1 className="mt-4 max-w-xl font-display text-3xl font-extrabold leading-[1.15] sm:text-5xl md:text-6xl md:leading-tight">
              One donation can give someone one more tomorrow.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-primary-foreground/90 sm:text-base sm:leading-7">
              A few minutes of your time can make a life-changing difference. Register as a
              voluntary blood donor and help us connect people in need with possible donor
              support across Malappuram.
            </p>

            <div className="mt-7 flex flex-col gap-3 min-[380px]:flex-row min-[380px]:flex-wrap">
              <Link
                to="/donate"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-secondary px-5 py-3 text-center font-display text-sm font-bold text-secondary-foreground transition hover:opacity-90 sm:px-6"
              >
                Become a Donor
              </Link>

              <Link
                to="/need-blood"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary-foreground/40 px-5 py-3 text-center font-display text-sm font-bold text-primary-foreground transition hover:bg-primary-foreground/10 sm:px-6"
              >
                I Need Blood Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* WHY BLOOD DONATION MATTERS */}
      <section className="border-b border-border bg-muted/45 px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            Why blood donation matters
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold text-primary sm:text-4xl">
            Your willingness to help can reach far beyond one moment.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="card-hover rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <Icon className="h-6 w-6 text-secondary" aria-hidden />
                <h3 className="mt-5 font-display text-xl font-bold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT OUR PROGRAM */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            Our community initiative
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-primary sm:text-4xl">
            Connecting Donors With Those Who Need Them
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            This initiative is a community-focused blood donor network supported by Indian Youth
            Congress, Malappuram, created to help connect voluntary blood donors with people who
            urgently need blood.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-foreground/80">
            <li className="flex gap-3">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden />
              People can register as voluntary blood donors, and their details are securely
              maintained.
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden />
              Authorised coordinators can identify suitable donors and contact them when their blood
              group is needed.
            </li>
            <li className="flex gap-3">
              <HeartHandshake className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden />
              People who urgently need blood can reach the help desk. The goal is to make blood
              support easier to find across Malappuram when it matters most.
            </li>
          </ul>
          <Link
            to="/donate"
            className="group mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-3 font-display text-sm font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Become a Donor{" "}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-2xl shadow-lift">
         <img
              src={hero}
              alt="Volunteers and a nurse at an Indian Youth Congress blood donation camp"
              width={1920}
              height={1088}
              className="aspect-video h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
              <div className="absolute inset-x-0 bottom-0 bg-primary/85 px-5 py-4 text-sm font-semibold text-primary-foreground">
            A local network built around voluntary service.
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-muted/40 px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            Simple process
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The network helps make the next step clear for donors, coordinators, and people seeking
            blood.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.number}
                className="card-hover rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-display font-bold text-secondary-foreground">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BLOOD GROUPS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            Every donor matters
          </p>

          <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
            Every blood group matters.
          </h2>

          <p className="mt-3 text-muted-foreground">
            The network welcomes voluntary donors across all major blood groups.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {bloodGroups.map((group) => (
            <li
              key={group}
              className="rounded-lg border border-border bg-card py-5 text-center font-display text-xl font-bold text-secondary shadow-card transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {group}
            </li>
          ))}
        </ul>
      </section>

      {/* OUR INSPIRATION */}
      <section className="border-y border-border bg-muted/45 px-4 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
              Our inspiration
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
              Indian Youth Congress
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Indian Youth Congress is the youth wing of the Indian National Congress. The
              organisation emphasizes youth participation, community engagement, and social service.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Rahul Gandhi is described by IYC as a source of inspiration for the organisation and
              its youth-oriented vision.
            </p>
            <p className="mt-6 border-l-2 border-accent pl-4 text-sm font-semibold leading-6 text-primary">
              Inspired by a spirit of youth participation and service, our Malappuram initiative
              focuses on one simple goal: helping people find blood when they need it most.
            </p>
            <Link
              to="/donate"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary"
            >
              Join Our Donor Network{" "}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>

      {/* BLOOD HELP DESK */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            Need urgent help?
          </p>

          <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
            Blood help desk — Call or WhatsApp
          </h2>

          <p className="mt-3 text-muted-foreground">
            Patients and relatives can reach our coordinators directly for urgent blood
            requirements.
          </p>

          <div className="mt-8">
            <WhatsappContacts />
          </div>
        </div>
      </section>

      {/* FINAL DONOR CTA */}
      <section className="border-t border-border bg-primary px-4 py-16 text-center text-primary-foreground sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Be someone&apos;s hope
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Ready to become a blood donor?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/75">
          Register your details today. When someone needs your blood group, authorised coordinators
          can contact you.
        </p>
        <Link
          to="/donate"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-display text-sm font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
        >
          Become a Donor <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
