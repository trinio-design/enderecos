"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AddressBox from "../AddressBox";
import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import FreightCard from "../FreightCard";
import SegmentToggle from "../SegmentToggle";
import { ArrowLeftCircleIcon, CheckIcon } from "../icons";

// ─── Inline SVG icons used only in this screen ───────────────────────────────

function InfoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function TruckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18.5" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PackageIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 8l9 5 9-5M12 21V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 5.5l9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Multi-package delivery item ─────────────────────────────────────────────

function DeliveryItem({
  label,
  freightName,
  eta,
  price,
}: {
  label: string;
  freightName: string;
  eta: string;
  price: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Pill label */}
      <span className="inline-flex items-center gap-1 self-start rounded-full bg-black px-2 py-0.5 text-[12px] font-semibold text-white">
        <PackageIcon size={14} />
        {label}
      </span>

      {/* Title row */}
      <div className="flex items-start justify-between text-[14px] leading-5 text-black">
        <div className="flex flex-col">
          <span className="font-bold">{freightName}</span>
          <span className="font-normal">{eta}</span>
        </div>
        <span className="font-bold text-right w-[62px]">{price}</span>
      </div>

      {/* Product thumbnail placeholder */}
      <div className="h-9 w-9 rounded-lg border border-ink-200 bg-ink-100" />
    </div>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

/**
 * Tela — Alterar frete (seleção do método de envio).
 *
 * Variants:
 *   ?variant=single   → entrega única  (node 4292-11336)
 *   ?variant=multi    → múltiplos pacotes (node 4292-11242)  [default]
 *
 * Default falls back to single if no param is present.
 */
export default function AlterarFrete() {
  const router = useRouter();
  const params = useSearchParams();
  const isMulti = params.get("variant") === "multi";

  const [freight, setFreight] = useState<"economico" | "expresso">("economico");
  const [tab, setTab] = useState<"envio" | "retirada">("envio");

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      {/* Back button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[14px] font-semibold text-black"
      >
        <ArrowLeftCircleIcon size={24} className="text-black" />
        Voltar
      </button>

      {/* Title + Envio/Retirada toggle */}
      <div className="flex items-center justify-between gap-6">
        <h1 className="shrink-0 text-[16px] font-bold text-black">Opções de envio</h1>
        <SegmentToggle
          options={[
            { key: "envio", label: "Envio" },
            { key: "retirada", label: "Retirada" },
          ]}
          value={tab}
          onChange={(key) => setTab(key as "envio" | "retirada")}
        />
      </div>

      {/* Shipping address */}
      <AddressBox
        title="Endereço do envio"
        lines={["Rua João da Silva, 123 - Ap. 32", "Botafogo, Rio de Janeiro"]}
        editHref="/checkout/alterar-endereco"
      />

      {/* ── Freight option cards ── */}
      <div className="flex flex-col gap-3">
        <FreightCard
          name="Frete econômico"
          price="R$12,90"
          eta={isMulti ? "3 pacotes de 1 a 2 dias úteis" : "Chegará até 18/09/26"}
          selected={freight === "economico"}
          onSelect={() => setFreight("economico")}
        />
        <FreightCard
          name="Frete expresso"
          price="R$22,90"
          eta={isMulti ? "3 pacotes de 1 a 6 dias úteis" : "Chegará até 15/09/26"}
          selected={freight === "expresso"}
          onSelect={() => setFreight("expresso")}
        />
      </div>

      {/* ── Múltiplos pacotes block (multi variant only) ── */}
      {isMulti && (
        <div className="flex flex-col overflow-hidden rounded-lg border border-[#d6d6d6]">
          {/* Header band */}
          <div className="flex flex-col gap-3 rounded-t-lg border-b border-[#d6d6d6] bg-[#f3f4f6] px-4 py-4">
            {/* Section title */}
            <div className="flex items-center gap-2">
              <InfoIcon size={16} />
              <span className="text-[14px] font-semibold text-black">Múltiplos pacotes</span>
            </div>

            {/* Summary: deliveries count + tags */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <TruckIcon size={14} />
                <span className="text-[12px] font-bold text-[#374151]">2 entregas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded px-1 py-0 text-[12px] font-medium text-[#374151] bg-[#d1d5db]">
                  1 a 2 dias úteis
                </span>
                <span className="rounded px-1 py-0 text-[12px] font-medium text-[#374151] bg-[#d1d5db]">
                  R$20,00
                </span>
              </div>
            </div>
          </div>

          {/* Delivery items */}
          <div className="flex flex-col gap-6 px-4 pb-4 pt-4">
            <DeliveryItem
              label="Entrega 1"
              freightName="Frete econômico"
              eta="Chegará até 18/09/26"
              price="R$12,90"
            />

            <hr className="border-t border-[#d1d5db]" />

            <DeliveryItem
              label="Entrega 2"
              freightName="Frete expresso"
              eta="Chegará até 18/09/26"
              price="R$12,90"
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <CtaButton onClick={() => router.push("/checkout/revisao-envio")}>
        Continuar
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
