import { CalendarDaysIcon, ClockIcon, MapPinIcon, MapIcon } from '@heroicons/react/24/outline';
import ConfirmPresenceModal from './ConfirmPresenceModal';

export default function EventInfo() {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: '#1e5175' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-bold text-white mb-12">Sua presença é muito importante para nós!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 font-semibold">
          <div className="flex items-center gap-3">
            <CalendarDaysIcon className="w-6 h-6" />
            <span className="font-body text-lg">08 de Novembro de 2025</span>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon className="w-6 h-6" />
            <span className="font-body text-lg">12h00</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-6 h-6" />
            <span className="font-body text-lg">Residencial Hipólito</span>
          </div>
          <div className="flex items-center gap-3">
            <MapIcon className="w-6 h-6" />
            <span className="font-body text-lg">Rua Milão, 71 - Pagani, Palhoça - SC</span>
          </div>
          <div></div>
        </div>
        <div className="text-center">
          <ConfirmPresenceModal />
        </div>
      </div>
    </section>
  );
}


