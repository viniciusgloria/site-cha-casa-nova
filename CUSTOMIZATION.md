# Personalização do Site de Chá de Casa Nova

## Como Personalizar

### 1. Alterar os Nomes dos Noivos
No arquivo `src/app/page.tsx`, linha 12, altere:
```tsx
<span className="text-brandGreen-600">Maria & João</span>
```
Para os nomes dos noivos.

### 2. Adicionar/Editar Presentes
No arquivo `src/data/gifts.ts`, você pode:
- Adicionar novos presentes ao array `gifts`
- Editar presentes existentes
- Alterar valores, descrições, etc.

### 3. Personalizar Cores
No arquivo `tailwind.config.ts`, você pode alterar as cores:
- `brandGreen`: Verde da marca
- `brandGold`: Dourado da marca

### 4. Adicionar Imagens Reais
1. Coloque as imagens dos presentes na pasta `public/images/`
2. Atualize o campo `image` em `src/data/gifts.ts` com o caminho correto

### 5. Estrutura dos Componentes
- `src/components/ProgressBar.tsx`: Barra de progresso dos presentes
- `src/components/GiftCard.tsx`: Card individual de cada presente
- `src/components/HowItWorks.tsx`: Seção "Como Funciona"
- `src/components/GiftsGrid.tsx`: Grid com todos os presentes
- `src/app/page.tsx`: Página principal

## Funcionalidades Implementadas

✅ Seção Hero com título e subtítulo
✅ Seção "Como Funciona" com 3 passos
✅ Grid de presentes com cards responsivos
✅ Barras de progresso animadas
✅ Contador de apoiadores
✅ Botões de contribuição
✅ Rodapé com mensagem de agradecimento
✅ Design responsivo mobile-first
✅ Cores customizadas (verde e dourado)
✅ Componentes reutilizáveis

## Próximos Passos Sugeridos

1. **Integração com Pagamento**: Adicionar integração com PIX, cartão, etc.
2. **Backend**: Criar API para gerenciar presentes e contribuições
3. **Autenticação**: Sistema de login para noivos gerenciarem
4. **Notificações**: Email/SMS quando alguém contribui
5. **Relatórios**: Dashboard com estatísticas das contribuições
