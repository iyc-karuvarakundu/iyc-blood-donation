import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { bloodGroups, malappuramPlaces } from "@/lib/coordinators";
import banner from "@/assets/banner.webp";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate Blood — Register as a Donor | IYC Malappuram" },
      {
        name: "description",
        content:
          "Register with the Indian Youth Congress Malappuram blood donor network. Add your blood group and place so our coordinators can reach you when a patient needs help.",
      },
      { property: "og:title", content: "Donate Blood — IYC Malappuram Blood Bank" },
      {
        property: "og:description",
        content:
          "Join the Indian Youth Congress Malappuram donor registry. Every drop you give brings hope.",
      },
    ],
  }),
  component: DonatePage,
});

const donorSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{7,20}$/, "Enter a valid phone number")
    .max(20),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(255)]),
  blood_group: z.enum(bloodGroups, { message: "Select your blood group" }),
  district: z.string().trim().min(2).max(60),
  place: z.string().trim().min(2, "Select or enter your place").max(100),
  mandalam: z.string().trim().min(2, "Select or enter your mandalam").max(100),
  date_of_birth: z.string().trim().max(20),
  notes: z.string().trim().max(500),
});

const mandalamsByDistrict: Record<string, string[]> = {
  Malappuram: ["Kondotty", "Eranad", "Nilambur", "Wandoor", "Manjeri", "Perinthalmanna", "Mankada", "Malappuram", "Vengara", "Vallikkunnu", "Tirurangadi", "Tanur", "Tirur", "Kottakkal", "Thavanur", "Ponnani"],
  Kozhikode: ["Vatakara", "Kuttiady", "Nadapuram", "Quilandy", "Perambra", "Balussery", "Elathur", "Kozhikode North", "Kozhikode South", "Beypore", "Kunnamangalam", "Koduvally", "Thiruvambady"],
  Palakkad: ["Thrithala", "Pattambi", "Shornur", "Ottapalam", "Kongad", "Mannarkkad", "Malampuzha", "Palakkad", "Tarur", "Chittur", "Nenmara", "Alathur"],
  Thrissur: ["Chelakkara", "Kunnamkulam", "Guruvayur", "Manalur", "Wadakkanchery", "Ollur", "Thrissur", "Nattika", "Kaipamangalam", "Irinjalakuda", "Puthukkad", "Chalakudy", "Kodungallur"],
  Wayanad: ["Mananthavady", "Sulthan Bathery", "Kalpetta"],
  Kannur: ["Payyannur", "Kalliasseri", "Taliparamba", "Irikkur", "Azhikode", "Kannur", "Dharmadom", "Thalassery", "Kuthuparamba", "Mattannur", "Peravoor"],
  Kasaragod: ["Manjeshwaram", "Kasaragod", "Udma", "Kanhangad", "Thrikaripur"],
  Ernakulam: ["Perumbavoor", "Angamaly", "Aluva", "Kalamassery", "Paravur", "Vypin", "Kochi", "Thrippunithura", "Ernakulam", "Thrikkakara", "Kunnathunad", "Piravom", "Muvattupuzha", "Kothamangalam"],
  Idukki: ["Devikulam", "Udumbanchola", "Thodupuzha", "Idukki", "Peerumade"],
  Kottayam: ["Pala", "Kaduthuruthy", "Vaikom", "Ettumanoor", "Kottayam", "Puthuppally", "Changanassery", "Kanjirappally", "Poonjar"],
  Alappuzha: ["Aroor", "Cherthala", "Alappuzha", "Ambalappuzha", "Kuttanad", "Haripad", "Kayamkulam", "Mavelikkara", "Chengannur"],
  Pathanamthitta: ["Thiruvalla", "Ranni", "Aranmula", "Konni", "Adoor"],
  Kollam: ["Karunagappally", "Chavara", "Kunnathur", "Kottarakkara", "Pathanapuram", "Punalur", "Chadayamangalam", "Kundara", "Kollam", "Eravipuram", "Chathannur"],
  Thiruvananthapuram: ["Varkala", "Attingal", "Chirayinkeezhu", "Nedumangad", "Vamanapuram", "Kazhakkoottam", "Vattiyoorkavu", "Thiruvananthapuram", "Nemom", "Aruvikkara", "Parassala", "Kattakkada", "Kovalam", "Neyyattinkara"],
};

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
const labelClass = "text-sm font-semibold text-primary";

function DonatePage() {
  const [district, setDistrict] = useState("Malappuram");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = donorSchema.safeParse(raw);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("saving");
    const values = parsed.data;
    const { error } = await supabase.from("donors").insert({
      full_name: values.full_name,
      phone: values.phone,
      email: values.email || null,
      blood_group: values.blood_group,
      district: values.district,
      place: values.place,
      mandalam: values.mandalam,
      date_of_birth: values.date_of_birth || null,
      notes: values.notes || null,
    });

    if (error) {
      setStatus("error");
      setMessage("We could not save your registration. Please try again in a moment.");
      return;
    }

    form.reset();
    setDistrict("Malappuram");
    setStatus("done");
    setMessage(
      "Thank you! You are now part of the Indian Youth Congress Malappuram donor network.",
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
        Blood Donation Campaign
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
        Be the reason someone smiles today
      </h1>
      <p className="mt-3 text-muted-foreground">
        Join our mission to save lives by donating blood. Every drop you give brings hope.
        Your details stay confidential and are visible only to our authorised coordinators.
      </p>
      
      <div className="mt-8 mb-6 w-full overflow-hidden rounded-xl">
        <img
          src={banner}
          alt="RDS Raktha Dhona Sena Malappuram"
          className="block h-auto w-full object-contain"
        />
      </div>


      {status === "done" ? (
        <div className="mt-8 rounded-xl border border-success/40 bg-success/10 p-6">
          <h2 className="font-display text-xl font-bold text-primary">Registration received</h2>
          <p className="mt-2 text-sm text-foreground/80">{message}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="rounded-md bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground"
            >
              Register another donor
            </button>
            <Link
              to="/need-blood"
              className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
            >
              Need blood now?
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-8 grid gap-5 rounded-xl border border-border bg-card p-6 shadow-card sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="full_name">
              Name
            </label>
            <input id="full_name" name="full_name" className={fieldClass} maxLength={100} />
            <FieldError message={errors["full_name"]} />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              inputMode="tel"
              placeholder="+91 98765 43210"
              className={fieldClass}
              maxLength={20}
            />
            <FieldError message={errors["phone"]} />
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email (optional)
            </label>
            <input id="email" name="email" type="email" className={fieldClass} maxLength={255} />
            <FieldError message={errors["email"]} />
          </div>

          <div>
            <label className={labelClass} htmlFor="blood_group">
              Blood group
            </label>
            <select id="blood_group" name="blood_group" defaultValue="" className={fieldClass}>
              <option value="">Select blood group</option>
              {bloodGroups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <FieldError message={errors["blood_group"]} />
          </div>

          <div>
            <label className={labelClass} htmlFor="district">
              District
            </label>
            <select
                id="district"
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={fieldClass}
              >
                {[
                "Malappuram",
                "Kozhikode",
                "Palakkad",
                "Thrissur",
                "Wayanad",
                "Kannur",
                "Kasaragod",
                "Ernakulam",
                "Idukki",
                "Kottayam",
                "Alappuzha",
                "Pathanamthitta",
                "Kollam",
                "Thiruvananthapuram",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <FieldError message={errors["district"]} />
          </div>

          <div>
            <label className={labelClass} htmlFor="place">
              Place
            </label>
            <input
                key={district}
                id="place"
                name="place"
                list="places"
                placeholder="Select or type your place"
                className={fieldClass}
                maxLength={100}
              />
              <datalist id="places">
                {(district === "Malappuram" ? malappuramPlaces : []).map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            <FieldError message={errors["place"]} />
          </div>

                    <div>
            <label className={labelClass} htmlFor="mandalam">
              Mandalam
            </label>
            <input
              key={district}
              id="mandalam"
              name="mandalam"
              list="mandalams"
              placeholder="Select or type your mandalam"
              className={fieldClass}
              maxLength={100}
            />
            <datalist id="mandalams">
              {(mandalamsByDistrict[district] ?? []).map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
            <FieldError message={errors["mandalam"]} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="date_of_birth">
              Date of birth
            </label>
            <input id="date_of_birth" name="date_of_birth" type="date" className={fieldClass} />
            <FieldError message={errors["date_of_birth"]} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="notes">
              Anything we should know? (optional)
            </label>
            <textarea id="notes" name="notes" rows={3} className={fieldClass} maxLength={500} />
            <FieldError message={errors["notes"]} />
          </div>

          {status === "error" && (
            <p className="sm:col-span-2 rounded-md bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
              {message}
            </p>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "saving"}
              className="w-full rounded-md bg-secondary px-5 py-3 font-display text-base font-bold text-secondary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "saving" ? "Submitting…" : "Submit"}
            </button>
            <p className="mt-3 text-xs text-muted-foreground">
              By submitting you agree that our coordinators may contact you when a patient
              needs your blood group.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-semibold text-destructive">{message}</p>;
}