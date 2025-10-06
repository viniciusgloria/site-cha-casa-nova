import { gifts } from '../data/gifts';
import GiftCard from './GiftCard';

export default function GiftsGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sugestão de presentes:
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            O valor pode ser parcelado no cartão de crédito ou direto no PIX!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>

        <div className="text-center mt-15">
          <p className="text-gray-600 mb-4 text-lg font-body font-semibold">
            Teve alguma dificuldade com o pagamento?
          </p>
          <a
            href="https://wa.me/5548999989455?text=Oi,%20tive%20um%20problema%20com%20o%20pagamento%20do%20presente!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Fale conosco!
          </a>
        </div>
      </div>
    </section>
  );
}
