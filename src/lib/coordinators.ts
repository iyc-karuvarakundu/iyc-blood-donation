export type Coordinator = {
  name: string;
  area: string;
  display: string;
  /** E.164 digits, no plus — used for wa.me links */
  wa: string;
  tel: string;
};

export const coordinators: Coordinator[] = [
  {
    name: "Haris",
    area: "Mudur",
    display: "+91 96337 25868",
    wa: "919633725868",
    tel: "+919633725868",
  },
  {
    name: "Nisam",
    area: "Karuvarakundu",
    display: "+91 96450 71082",
    wa: "919645071082",
    tel: "+919645071082",
  },
  {
    name: "Rashid Chola",
    area: "",
    display: "+91 8129554442",
    wa: "918129554442",
    tel: "+918129554442",
  },
];

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
