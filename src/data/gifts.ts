export interface Gift {
  id: string;
  name: string;
  image: string;
  targetAmount: number;
  raisedAmount: number;
  supporters: number;
  description: string;
  isFixedPrice: boolean;
  fixedPrice?: number;
}

export const gifts: Gift[] = [
  // Produtos com valores fixos
  {
    id: '1',
    name: 'Kit de Utensílios de Cozinha',
    image: '/images/kit-utensilios.jpg',
    targetAmount: 50,
    raisedAmount: 0,
    supporters: 0,
    description: 'Kit completo para o Vini preparar o jantar!',
    isFixedPrice: true,
    fixedPrice: 50
  },
  {
    id: '2',
    name: 'Torradeira Elétrica',
    image: '/images/torradeira.jpg',
    targetAmount: 100,
    raisedAmount: 0,
    supporters: 0,
    description: 'Cafés da manhã com pão quentinho!',
    isFixedPrice: true,
    fixedPrice: 100
  },
  {
    id: '3',
    name: 'Liquidificador Elétrico',
    image: '/images/liquidificador.jpg',
    targetAmount: 150,
    raisedAmount: 0,
    supporters: 0,
    description: 'Para a nutri Ana fazer seus sucos saudáveis!',
    isFixedPrice: true,
    fixedPrice: 150
  },
  // Produtos com meta de arrecadação
  {
    id: '4',
    name: 'Televisão para Sala',
    image: '/images/tv.jpg',
    targetAmount: 1699,
    raisedAmount: 600,
    supporters: 3,
    description: 'Essa é para a felicidade do Vini no dia a dia!',
    isFixedPrice: false
  },
  {
    id: '5',
    name: 'Guarda-roupa do Casal',
    image: '/images/armario.jpg',
    targetAmount: 1999,
    raisedAmount: 200,
    supporters: 1,
    description: 'Tem que ser espaçoso para evitar brigas!',
    isFixedPrice: false
  },
  {
    id: '6',
    name: 'Ar Condicionado Quarto',
    image: '/images/ar-condicionado.jpg',
    targetAmount: 2199,
    raisedAmount: 500,
    supporters: 2,
    description: 'Verão sem ar não é uma opção. Jesus amado!',
    isFixedPrice: false
  }
];
