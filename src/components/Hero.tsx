"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={
            isMobile
              ? "/hero/HERO_CHACASANOVA3_mobile.png"
              : "/hero/HERO_CHACASANOVA3.png"
          }
          alt="Chá de Casa Nova - Vini, Ana e Nina"
          fill
          priority
          className="object-cover object-[center_30%] sm:object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 h-full flex items-center justify-center"></div>
    </section>
  );
}