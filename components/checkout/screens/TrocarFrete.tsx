"use client";

import { useState } from "react";
import { useCheckoutRouter } from "@/hooks/useCheckoutRouter";

import AddressBox from "../AddressBox";
import CtaButton from "../CtaButton";
import Footer from "../Footer";
import FreightCard from "../FreightCard";
import Header from "../Header";
import SegmentToggle from "../SegmentToggle";
import { ArrowLeftCircleIcon, CheckIcon } from "../icons";

// ── inline SVG icons used only in this screen ────────────────────────────────

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 7h11v9H3V7ZM14 10h4l3 3v3h-7V10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="18" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3 3 7.5V16.5L12 21L21 16.5V7.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3 7.5 12 12M12 12 21 7.5M12 12V21" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 5.25 16.5 9.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ── types ─────────────────────────────────────────────────────────────────────

type Variant = "single" | "guest";

// ── sub-components ────────────────────────────────────────────────────────────

/**
 * Múltiplos pacotes section (guest variant only).
 * Shows an info header card and per-package delivery breakdown.
 */
function MultipleParcels() {
  return (
    <div className="w-full rounded-[8px] border border-[#d6d6d6] bg-white">
      {/* header */}
      <div className="flex flex-col gap-3 rounded-t-[8px] border border-[#d6d6d6] bg-ink-100 p-4">
        <div className="flex items-center gap-2">
          <span className="text-ink-400">
            <InfoIcon />
          </span>
          <span className="text-[14px] font-semibold text-black">Múltiplos pacotes</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-ink-600">
            <TruckIcon />
            <span className="text-[12px] font-bold text-[#374151]">2 entregas</span>
          </div>
          <div className="flex gap-2">
            <span className="rounded-[4px] bg-ink-200 px-1 text-[12px] font-medium text-[#374151] leading-5">
              1 a 2 dias úteis
            </span>
            <span className="rounded-[4px] bg-ink-200 px-1 text-[12px] font-medium text-[#374151] leading-5">
              R$20,00
            </span>
          </div>
        </div>
      </div>

      {/* packages */}
      <div className="flex flex-col gap-6 px-4 pb-4">
        {/* Entrega 1 */}
        <div className="flex flex-col gap-3.5 pt-4">
          <span className="inline-flex items-center gap-1 self-start rounded-pill bg-[#0a0a0a] px-2 py-0.5 text-[12px] font-semibold text-white">
            <PackageIcon />
            Entrega 1
          </span>
          <div className="flex w-full items-start justify-between text-[14px] text-black leading-5">
            <div className="flex flex-col">
              <span className="font-bold">Frete econômico</span>
              <span className="font-normal">Chegará até 18/09/26</span>
            </div>
            <span className="font-bold text-right">R$12,90</span>
          </div>
          {/* product thumbnail placeholder */}
          <div className="h-9 w-9 rounded-[8px] border border-ink-200 bg-ink-100" />
        </div>

        {/* divider */}
        <div className="h-px w-full rounded-sm bg-ink-200" />

        {/* Entrega 2 */}
        <div className="flex flex-col gap-3.5">
          <span className="inline-flex items-center gap-1 self-start rounded-pill bg-[#0a0a0a] px-2 py-0.5 text-[12px] font-semibold text-white">
            <PackageIcon />
            Entrega 2
          </span>
          <div className="flex w-full items-start justify-between text-[14px] text-black leading-5">
            <div className="flex flex-col">
              <span className="font-bold">Frete expresso</span>
              <span className="font-normal">Chegará até 18/09/26</span>
            </div>
            <span className="font-bold text-right">R$12,90</span>
          </div>
          {/* product thumbnail placeholder */}
          <div className="h-9 w-9 rounded-[8px] border border-ink-200 bg-ink-100" />
        </div>
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

/**
 * Tela — Trocar frete (seleção de frete).
 *
 * variant="single" (default) → fluxo 1-click: cabeçalho "Opções de envio" + toggle Envio/Retirada
 *                               + endereço + cards de frete (node 4273-8700)
 * variant="guest"             → fluxo guest: tabs DADOS/ENTREGA/PAGAMENTO + lista de fretes
 *                               + seção Múltiplos pacotes (node 4315-11235)
 */
export default function TrocarFrete({ variant = "single" }: { variant?: Variant }) {
  const router = useCheckoutRouter();
  const [freight, setFreight] = useState(0);
  const [tab] = useState<"envio" | "retirada">("envio");

  // ── single-delivery variant (4273-8700) ────────────────────────────────────
  if (variant === "single") {
    return (
      <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
        <Header total="R$ 620,10" quantity={3} />

        {/* Voltar */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[14px] font-semibold text-black"
        >
          <ArrowLeftCircleIcon size={24} className="text-black" />
          Voltar
        </button>

        {/* Title + toggle */}
        <div className="flex items-center justify-between gap-6">
          <h1 className="text-[16px] font-bold text-black">Opções de envio</h1>
          <SegmentToggle
            options={[
              { key: "envio", label: "Envio" },
              { key: "retirada", label: "Retirada" },
            ]}
            value={tab}
            onChange={(key) =>
              key === "retirada" && router.push("/checkout/opcoes-retirada")
            }
          />
        </div>

        {/* Address */}
        <AddressBox
          title="Endereço do envio"
          lines={[
            "Rua João da Silva, 123 - Ap. 32",
            "Botafogo, Rio de Janeiro",
          ]}
          editHref="/checkout/alterar-endereco"
        />

        {/* Freight options */}
        <div className="flex flex-col gap-3">
          <FreightCard
            name="Frete econômico"
            price="R$12,90"
            eta="Chegará até 18/09/26"
            selected={freight === 0}
            onSelect={() => setFreight(0)}
          />
          <FreightCard
            name="Frete expresso"
            price="R$22,90"
            eta="Chegará até 15/09/26"
            selected={freight === 1}
            onSelect={() => setFreight(1)}
          />
        </div>

        <CtaButton onClick={() => router.push("/checkout/revisao-envio")}>
          Continuar
        </CtaButton>

        <div className="mt-auto pt-2">
          <Footer showRecaptcha />
        </div>
      </div>
    );
  }

  // ── guest variant (4315-11235) ─────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      {/* Step tabs: DADOS / ENTREGA / PAGAMENTO */}
      <nav className="flex w-full border-b border-ink-200">
        {(["DADOS", "ENTREGA", "PAGAMENTO"] as const).map((step) => {
          const active = step === "ENTREGA";
          return (
            <div
              key={step}
              className={`flex flex-1 items-center justify-center py-2.5 text-[12px] ${
                active
                  ? "border-b-2 border-black font-bold text-[#374151]"
                  : "font-medium text-ink-400"
              }`}
            >
              {step}
            </div>
          );
        })}
      </nav>

      {/* Title */}
      <h1 className="text-[16px] font-bold text-black">
        Selecione a entrega / retirada
      </h1>

      {/* Freight options */}
      <div className="flex flex-col gap-3">
        {/* Frete econômico (selected, with address detail) */}
        <button
          type="button"
          onClick={() => setFreight(0)}
          aria-pressed={freight === 0}
          className={`flex w-full flex-col gap-3 rounded-[8px] border bg-white p-4 text-left ${
            freight === 0 ? "border-black" : "border-hairline"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              {freight === 0 ? (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black">
                  <CheckIcon size={10} className="text-white" />
                </span>
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border border-[rgba(0,0,0,0.16)] bg-white" />
              )}
              <span className="text-[14px] font-bold text-black">Frete econômico</span>
            </div>
            <span className="text-[14px] font-bold text-black">R$12,90</span>
          </div>
          <p className="pl-7 text-[14px] text-black">3 pacotes de 1 a 2 dias úteis</p>
          {freight === 0 && (
            <div className="pl-7 text-[12px] text-black">
              <p className="font-semibold leading-5">Local de entrega:</p>
              <p className="font-normal leading-[1.3]">
                Rua João da Silva, 123 - Ap. 32 - Botafogo, Rio de Janeiro
              </p>
            </div>
          )}
        </button>

        {/* Frete expresso */}
        <button
          type="button"
          onClick={() => setFreight(1)}
          aria-pressed={freight === 1}
          className={`flex w-full flex-col gap-3 rounded-[8px] border bg-white p-4 text-left ${
            freight === 1 ? "border-black" : "border-hairline"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              {freight === 1 ? (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black">
                  <CheckIcon size={10} className="text-white" />
                </span>
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border border-[rgba(0,0,0,0.16)] bg-white" />
              )}
              <span className="text-[14px] font-bold text-black">Frete expresso</span>
            </div>
            <span className="text-[14px] font-bold text-black">R$22,90</span>
          </div>
          <p className="pl-7 text-[14px] text-black">3 pacotes de 1 a 6 dias úteis</p>
        </button>

        {/* Retirada em Loja */}
        <button
          type="button"
          onClick={() => setFreight(2)}
          aria-pressed={freight === 2}
          className={`flex w-full flex-col gap-3 rounded-[8px] border bg-white p-4 text-left ${
            freight === 2 ? "border-black" : "border-[#d6d6d6]"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              {freight === 2 ? (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black">
                  <CheckIcon size={10} className="text-white" />
                </span>
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border border-[rgba(0,0,0,0.16)] bg-white" />
              )}
              <span className="text-[14px] font-bold text-black">Retirada em Loja</span>
            </div>
            <span className="text-[14px] font-bold text-black">Grátis</span>
          </div>
          <p className="pl-7 text-[14px] text-black">Disponível em até 4 horas</p>
        </button>
      </div>

      {/* Múltiplos pacotes */}
      <MultipleParcels />

      <div className="mt-auto pt-2">
        <Footer />
      </div>
    </div>
  );
}
