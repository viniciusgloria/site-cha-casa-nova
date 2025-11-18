import Hero from '../components/Hero';
import EventInfo from '../components/EventInfo';
import HowItWorks from '../components/HowItWorks';
import GiftsGrid from '../components/GiftsGrid';
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* CTA Ver Presentes removido (voltou para o Hero) */}

      {/* Event Info Section */}
      <EventInfo />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Gifts Grid Section */}
      <div id="gifts-section">
        <GiftsGrid />
      </div>

      {/* Footer */}
      <footer className="py-5 bg-[#69a599]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Image src="/images/nina.png" alt="Nina" width={240} height={240} className="w-24 h-24 sm:w-60 sm:h-60 object-cover" priority={false} />
            <span>
              A Nina agradece a participação, esperamos todos vocês no dia 22 para celebrar esta nova fase!
            </span>
          </h3>
        </div>
      </footer>
    </div>
  );
}
