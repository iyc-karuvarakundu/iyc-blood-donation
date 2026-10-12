import { useEffect, useState } from "react";

type Props = {
  images: string[]; // imported image URLs
  interval?: number; // ms between slides
};

export default function HeroBackgroundSlider({ images, interval = 5000 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "center 25%", // keeps faces in frame; adjust if needed
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1.06)" : "scale(1)",
            transition: "opacity 1.2s ease-in-out, transform 6s ease-out",
          }}
        />
      ))}

      {/* dark blue overlay so white text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,30,70,0.92) 0%, rgba(15,30,70,0.75) 45%, rgba(15,30,70,0.35) 100%)",
        }}
      />
    </div>
  );
}

/*
USAGE in your hero section (src/routes/index.tsx or components/Hero.tsx):

import HeroBackgroundSlider from "@/components/HeroBackgroundSlider";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

<section className="relative">
  <HeroBackgroundSlider images={[hero1, hero2]} interval={5000} />
  <div className="relative z-10">
    ...existing heading, paragraph, buttons...
  </div>
</section>
*/