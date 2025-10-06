"use client";

export default function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/hero/HERO_CHACASANOVA3.png')" }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 h-full" />
    </section>
  );
}
