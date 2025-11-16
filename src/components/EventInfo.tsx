"use client";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, MapIcon } from "@heroicons/react/24/outline";
import ConfirmPresenceModal from "./ConfirmPresenceModal";

export default function EventInfo() {
  // 🗓️ Função para abrir o Google Calendar com o evento pré-preenchido
  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent("Chá de Casa Nova - Vini, Ana & Nina");
    const details = encodeURIComponent("Esperamos você para celebrar com a gente! 💛");
    const location = encodeURIComponent("Rua Brasilpinho, 286 - Kobrasol, São José - SC");
    // Formato de data: YYYYMMDDTHHmmssZ — o “Z” indica UTC, então ajustamos -3h (Brasil)
    const start = "20251122T150000Z"; // 12h00 BRT = 15h00 UTC
    const end = "20251122T170000Z";   // 14h00 BRT = 17h00 UTC

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

    window.open(url, "_blank");
  };

  return (
    <section className="py-12 px-4" style={{ backgroundColor: "#1e5175" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-bold text-white mb-12">
          Sua presença é muito importante para nós!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 font-semibold">
          {/* 📅 Data (clicável para abrir no Google Calendar) */}
          <div className="flex items-center gap-3">
            <CalendarDaysIcon className="w-6 h-6" />
            <button
              onClick={handleAddToGoogleCalendar}
              className="font-body text-lg hover:underline hover:text-amber-400 transition-colors text-left"
              title="Adicionar ao Google Calendar"
            >
              22 de Novembro de 2025
              <br />
              <span className="text-sm text-white/80">Clique para adicionar a sua agenda!</span>
            </button>
          </div>

          {/* ⏰ Horário */}
          <div className="flex items-center gap-3">
            <ClockIcon className="w-6 h-6" />
            <span className="font-body text-lg">12h00</span>
          </div>

          {/* 📍 Local */}
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-6 h-6" />
            <span className="font-body text-lg">Residencial Ville de Luxembourg</span>
          </div>

          {/* 🗺️ Endereço (Waze) */}
<div className="flex items-center gap-3">
  <MapIcon className="w-6 h-6" />
  <a
    href="https://ul.waze.com/ul?place=ChIJ0ZSby95JJ5URREcdbuq69J8&ll=-27.59117620%2C-48.61401230&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
    target="_blank"
    rel="noopener noreferrer"
    className="font-body text-lg hover:underline hover:text-amber-400 transition-colors"
    title="Abrir no Waze"
  >
    <span className="block whitespace-nowrap">
      Rua Brasilpinho, 286 – Kobrasol, São José – SC
    </span>
    <span className="block text-sm text-white/80">Clique para abrir no Waze!</span>
  </a>
</div>
        </div>

        <div className="text-center">
          <ConfirmPresenceModal />
        </div>
      </div>
    </section>
  );
}
