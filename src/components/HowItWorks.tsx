interface Step {
  number: number;
  icon: 'gift' | 'currency' | 'check';
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: 'gift',
    title: 'Escolha um Presente',
    description: 'Navegue pela lista de presentes e escolha o que você gostaria de contribuir.'
  },
  {
    number: 2,
    icon: 'currency',
    title: 'Faça sua Contribuição',
    description: 'Contribua com um presente ou ajude a bater a meta dos super presentes!'
  },
  {
    number: 3,
    icon: 'check',
    title: 'Acompanhe a Evolução',
    description: 'Veja em tempo real a meta de cada presente progredindo.'
  }
];

function Icon({ name, className }: { name: Step['icon']; className?: string }) {
  if (name === 'gift') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    );
  }
  if (name === 'currency') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Como eu posso contribuir? É simples!
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-2 ring-emerald-200 shadow-sm">
                    <Icon name={step.icon} className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
