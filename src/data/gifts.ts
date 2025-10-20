// src/data/gifts.ts
export interface Gift {
  id: string;
  name: string;
  image: string;
  targetAmount: number;   // em reais
  raisedAmount: number;   // em reais
  supporters: number;
  description: string;
  isFixedPrice: boolean;
  fixedPrice?: number;

  // novos campos (opcionais)
  lastContributorName?: string; // ex.: "Fernando"
  lastContributionAt?: string;  // ex.: "2025-10-06T12:00:00-03:00"
}

export const gifts: Gift[] = [
  // Produtos com valores fixos
  {
    id: '1',
    name: 'Kit de Utensílios de Cozinha',
    image: '/images/kit-utensilios.png',
    targetAmount: 50,
    raisedAmount: 0,
    supporters: 0,
    description: 'Kit completo para o Vini preparar o jantar!',
    isFixedPrice: true,
    fixedPrice: 50,
  },
  {
    id: '2',
    name: 'Torradeira Elétrica',
    image: '/images/torradeira-ana.png',
    targetAmount: 100,
    raisedAmount: 0,
    supporters: 0,
    description: 'Pão quentinho e torrado para a Ana!',
    isFixedPrice: true,
    fixedPrice: 100,
  },
  {
    id: '3',
    name: 'Presente da Nina',
    image: '/images/nina-presente.png',
    targetAmount: 150,
    raisedAmount: 0,
    supporters: 0,
    description: 'Ela não pode ficar de fora dos presentes!',
    isFixedPrice: true,
    fixedPrice: 75,
  },

  // Produtos com meta de arrecadação
  {
    id: '4',
    name: 'Televisão para Sala',
    image: '/images/tv.jpg',
    targetAmount: 1999,
    raisedAmount: 100,          // mantém contribuição do Fernando
    supporters: 1,
    description: 'Essa é para a felicidade do Vini no dia a dia!',
    isFixedPrice: false,
    lastContributorName: 'Fernando',
    lastContributionAt: '2025-10-06T12:00:00-03:00', // ajuste se quiser
  },
  {
    id: '5',
    name: 'Guarda-Roupas do Casal',
    image: '/images/armario.jpg',
    targetAmount: 1999,
    raisedAmount: 0,            // zerado
    supporters: 0,              // zerado
    description: 'Tem que ser espaçoso para evitar brigas!',
    isFixedPrice: false,
  },
  {
    id: '6',
    name: 'Ar-Condicionado do Quarto',
    image: '/images/ar-condicionado.jpg',
    targetAmount: 2199,
    raisedAmount: 50,
    supporters: 1,
    description: 'Verão sem ar não é uma opção. Jesus amado!',
    isFixedPrice: false,
  },
];
