"use client";

import { useState } from "react";
import { Package, Truck } from "lucide-react";
import { useCheckoutRouter } from "@/hooks/useCheckoutRouter";

import AddressBox from "../AddressBox";
import CtaButton from "../CtaButton";
import Footer from "../Footer";
import FreightCard from "../FreightCard";
import Header from "../Header";
import ProductThumb from "../ProductThumb";
import SegmentToggle from "../SegmentToggle";
import { ArrowLeftCircleIcon } from "../icons";

// ── Múltiplos pacotes summary card ────────────────────────────────────────────

function EntregaPill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-6 w-fit items-center gap-1 rounded-full bg-[#0a0a0a] px-2">
      <Package size={12} className="text-white" strokeWidth={1.8} />
      <span className="text-[12px] font-semibold text-white">{label}</span>
    </span>
  );
}

function MultiplosPacotesCard() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#d6d6d6] bg-white">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-[#d6d6d6] bg-[#f3f4f6] p-4">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-black">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="8" r="1" fill="currentColor" />
          </svg>
          <span className="text-[14px] font-semibold text-black">Múltiplos pacotes</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Truck size={14} className="text-[#374151]" strokeWidth={1.8} />
            <span className="text-[12px] font-bold text-[#374151]">2 entregas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-[4px] bg-[#d1d5db] px-1 text-[12px] font-medium leading-5 text-[#374151]">
              1 a 2 dias úteis
            </span>
            <span className="rounded-[4px] bg-[#d1d5db] px-1 text-[12px] font-medium leading-5 text-[#374151]">
              R$20,00
            </span>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="flex flex-col gap-6 px-4 pb-4">
        {/* Entrega 1 */}
        <div className="flex flex-col gap-[14px] pt-4">
          <EntregaPill label="Entrega 1" />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Frete econômico</p>
              <p className="font-normal">Chegará até 18/09/26</p>
            </div>
            <p className="font-bold">R$12,90</p>
          </div>
          <ProductThumb className="h-9 w-9 rounded-[8px] border border-[#d1d5db] object-cover" />
        </div>

        {/* Divider */}
        <div className="h-px w-full rounded-sm bg-[#d1d5db]" />

        {/* Entrega 2 */}
        <div className="flex flex-col gap-[14px]">
          <EntregaPill label="Entrega 2" />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Frete expresso</p>
              <p className="font-normal">Chegará até 18/09/26</p>
            </div>
            <p className="font-bold">R$12,90</p>
          </div>
          <ProductThumb className="h-9 w-9 rounded-[8px] border border-[#d1d5db] object-cover" />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

/**
 * Tela — Alterar frete (1-click, múltiplos pacotes / 2 entregas)
 */
export default function Checkout1clickAlterarFrete() {
  const router = useCheckoutRouter();
  const [freight, setFreight] = useState(0);

  return (
    <div className="flex min-h-screen flex-col gap-8 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <div className="flex flex-col gap-6">
        {/* Voltar */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[14px] font-semibold text-black"
        >
          <ArrowLeftCircleIcon size={24} className="text-black" />
          Voltar
        </button>

        {/* Título + toggle */}
        <div className="flex items-center justify-between gap-6">
          <h1 className="text-[16px] font-bold text-black">Opções de envio</h1>
          <SegmentToggle
            options={[
              { key: "envio", label: "Envio" },
              { key: "retirada", label: "Retirada" },
            ]}
            value="envio"
            onChange={(key) =>
              key === "retirada" && router.push("/checkout/1click-alterar-retirada")
            }
          />
        </div>

        {/* Endereço */}
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
            eta="3 pacotes de 1 a 2 dias úteis"
            selected={freight === 0}
            onSelect={() => setFreight(0)}
          />
          <FreightCard
            name="Frete expresso"
            price="R$22,90"
            eta="3 pacotes de 1 a 6 dias úteis"
            selected={freight === 1}
            onSelect={() => setFreight(1)}
          />
        </div>

        {/* Múltiplos pacotes */}
        <MultiplosPacotesCard />
      </div>

      <CtaButton onClick={() => router.push("/checkout/1click-2entregas")}>
        Continuar
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
