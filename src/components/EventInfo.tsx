"use client";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, MapIcon } from "@heroicons/react/24/outline";
import ConfirmPresenceModal from "./ConfirmPresenceModal";

export default function EventInfo() {
  // 🗓️ Função para abrir o Google Calendar com o evento pré-preenchido
  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent("Chá de Casa Nova - Vini, Ana & Nina");
    const details = encodeURIComponent("Esperamos você para celebrar com a gente! 💛");
    const location = encodeURIComponent("Rua Milão, 71 - Pagani, Palhoça - SC");
    // Formato de data: YYYYMMDDTHHmmssZ — o “Z” indica UTC, então ajustamos -3h (Brasil)
    const start = "20251108T150000Z"; // 12h00 BRT = 15h00 UTC
    const end = "20251108T170000Z";   // 14h00 BRT = 17h00 UTC

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
              08 de Novembro de 2025
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
            <span className="font-body text-lg">Residencial Hipólito</span>
          </div>

          {/* 🗺️ Endereço (Waze) */}
          <div className="flex items-center gap-3">
            <MapIcon className="w-6 h-6" />
            <a
              href="https://ul.waze.com/ul?place=ChIJFY0C_x81J5URz3MQbGSxF0Y&ll=-27.63815800%2C-48.68677980&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-lg hover:underline hover:text-amber-400 transition-colors"
            >
              Rua Milão, 71 - Pagani, Palhoça - SC
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