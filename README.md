# Endereços — Trinio Checkout

Fluxo de checkout **mobile-first (375px)** chamado **Endereços**, para a [Trinio](https://trinio.co) — plataforma de checkout para e-commerce brasileiro.

Construído com **Next.js 14 (App Router)**, **TypeScript** e **Tailwind CSS**.

## Design tokens

| Token            | Valor                | Uso                          |
| ---------------- | -------------------- | ---------------------------- |
| Destaque         | `#fe4f30`            | Vermelho Trinio (`trinio`)   |
| Sucesso          | `#38b74c`            | Check do Pix (`success`)     |
| Fundo            | `#ffffff`            | Branco                       |
| Borda            | `rgba(0,0,0,0.16)`   | Bordas dos cards (`hairline`)|
| Border-radius    | `8px`                | Padrão (`rounded-card`)      |
| Fonte            | Albert Sans          | Google Fonts (`next/font`)   |

Cores neutras mapeadas das variáveis do Figma estão em `ink.*` (ver `tailwind.config.ts`).

## Telas

O fluxo vive em `app/checkout/[step]/page.tsx` — uma rota dinâmica que resolve o
componente da etapa a partir do registro em `lib/steps.ts`. A navegação entre
etapas usa `useRouter` do `next/navigation`.

| Rota                                | Tela                          |
| ----------------------------------- | ----------------------------- |
| `/checkout/loading`                 | Loading (entrada do fluxo)    |
| `/checkout/revisao-retirada`        | Revisão do pedido (retirada)  |
| `/checkout/revisao-envio`           | Revisão do pedido (envio)     |
| `/checkout/otp`                     | Confirmação por código (OTP)  |
| `/checkout/carrinho`                | Carrinho                      |
| `/checkout/trocar-loja`             | Trocar loja (busca)           |
| `/checkout/busca-geolocalizacao`    | Busca por geolocalização      |
| `/checkout/opcoes-retirada`         | Opções de retirada            |
| `/checkout/trocar-frete`            | Trocar frete                  |
| `/checkout/alterar-frete`           | Alterar frete                 |
| `/checkout/alterar-endereco`        | Alterar endereço              |

A raiz (`/`) redireciona para `/checkout/loading`.

## Componentes reutilizáveis

Em `components/checkout/`:

- `MiniCart` — preço + ícone de sacola + badge de quantidade
- `Header` — logo da loja + mini-carrinho
- `Footer` — "Voltar à sacola" + "Compra segura Trinio®" (+ reCAPTCHA opcional)
- `PaymentCard` — opção de pagamento (radio / check verde)
- `PaymentSection` — bloco "Forma de pagamento" + "Endereço de cobrança"
- `StoreCard` — loja na busca de retirada
- `FreightCard` — opção de frete
- `PillButton` — botão "pill" (Editar / Alterar)
- `CtaButton` — CTA preto full-width
- `SegmentToggle` — alternador Envio/Retirada
- `AddressBox` — caixa de endereço com editar
- `Divider`, `StoreLogo`, `icons` — utilitários

Os ícones são SVGs inline (`components/checkout/icons.tsx`), sem dependências externas.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Deploy (Vercel)

O projeto sobe automaticamente na Vercel a cada push no GitHub
(`tamy-muzel/enderecos`). Nenhuma configuração extra é necessária — a Vercel
detecta Next.js e roda `next build`.
