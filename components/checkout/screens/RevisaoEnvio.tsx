"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AddressBox from "../AddressBox";
import CtaButton from "../CtaButton";
import Divider from "../Divider";
import Footer from "../Footer";
import Header from "../Header";
import FreightCard from "../FreightCard";
import PaymentSection from "../PaymentSection";
import PillButton from "../PillButton";
import { LockIcon } from "../icons";

// ── inline icons not yet in icons.tsx ──────────────────────────────────────

function InfoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function TruckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 4h14v11H1V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 8h4l3 4v3h-7V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="5.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PackageIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9l9-5 9 5v10l-9 5-9-5V9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 9l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 14v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ── Múltiplos pacotes sub-components ───────────────────────────────────────

const imgProductSample =
  "https://www.figma.com/api/mcp/asset/59a25893-bec6-4a75-bd00-c2376974d7ca";

interface DeliveryPackageProps {
  label: string;
  freightName: string;
  freightPrice: string;
  eta: string;
}

function DeliveryPackage({ label, freightName, freightPrice, eta }: DeliveryPackageProps) {
  return (
    <div className="flex flex-col gap-[14px]">
      {/* Pill label */}
      <div className="inline-flex items-center gap-1 rounded-pill bg-black px-2 py-[4px]">
        <PackageIcon size={14} />
        <span className="text-[12px] font-semibold text-white">{label}</span>
      </div>

      {/* Freight row */}
      <div className="flex w-full items-start justify-between text-[14px] leading-5 text-black">
        <div className="flex flex-1 flex-col">
          <p className="font-bold">{freightName}</p>
          <p className="font-normal text-ink-400">{eta}</p>
        </div>
        <p className="shrink-0 font-bold">{freightPrice}</p>
      </div>

      {/* Product thumbnail */}
      <div className="relative size-9 overflow-hidden rounded-card border border-ink-200">
        <img
          src={imgProductSample}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

/**
 * Tela — Revisão do pedido (modo Envio).
 *
 * Variantes:
 * - padrão        → entrega única   (node 4222-8988)
 * - ?multiplos=1  → múltiplos pacotes (node 4292-10883)
 */
export default function RevisaoEnvio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMultiple = searchParams.get("multiplos") === "1";

  const [freight, setFreight] = useState(0);

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <h1 className="text-[22px] font-bold text-ink-700">Revisar dados do pedido</h1>

      {/* Email */}
      <div>
        <p className="text-[14px] font-medium text-black">victoria.scholte@gmail.com</p>
        <p className="text-[9px] text-ink-300">
          Não é você?{" "}
          <span className="font-bold underline">Sair</span>
        </p>
      </div>

      <Divider />

      {/* Entrega ou retirada */}
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-black">Entrega ou retirada</h2>
        <PillButton>Editar</PillButton>
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

      {/* ── Múltiplos pacotes ── */}
      {isMultiple ? (
        <div className="flex flex-col overflow-hidden rounded-card border border-[#d6d6d6] bg-white">
          {/* Header do bloco */}
          <div className="flex flex-col gap-3 rounded-tl-card rounded-tr-card border-b border-[#d6d6d6] bg-[#f3f4f6] p-4">
            <div className="flex items-center gap-2">
              <InfoIcon size={16} />
              <span className="text-[14px] font-semibold text-black">Múltiplos pacotes</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <TruckIcon size={14} />
                <span className="text-[12px] font-bold text-[#374151]">2 entregas</span>
              </div>
              <div className="flex gap-2">
                <span className="rounded-[4px] bg-ink-200 px-1 text-[12px] font-medium text-[#374151]">
                  1 a 2 dias úteis
                </span>
                <span className="rounded-[4px] bg-ink-200 px-1 text-[12px] font-medium text-[#374151]">
                  R$20,00
                </span>
              </div>
            </div>
          </div>

          {/* Body dos pacotes */}
          <div className="flex flex-col gap-6 px-4 pb-4 pt-4">
            <DeliveryPackage
              label="Entrega 1"
              freightName="Frete econômico"
              freightPrice="R$12,90"
              eta="Chegará até 18/09/26"
            />
            <Divider />
            <DeliveryPackage
              label="Entrega 2"
              freightName="Frete expresso"
              freightPrice="R$12,90"
              eta="Chegará até 18/09/26"
            />
          </div>
        </div>
      ) : (
        /* ── Entrega única: cards de seleção de frete ── */
        <div className="flex flex-col gap-3">
          <FreightCard
            name="Envio sedex"
            price="R$12,90"
            eta="Chegará até 18/09/26"
            selected={freight === 0}
            onSelect={() => setFreight(0)}
          />
          <FreightCard
            name="Frete expresso"
            price="R$14,90"
            eta="Chegará até 18/09/26"
            selected={freight === 1}
            onSelect={() => setFreight(1)}
          />
        </div>
      )}

      <Divider />

      <PaymentSection />

      <CtaButton
        icon={<LockIcon size={24} />}
        onClick={() => router.push("/checkout/otp")}
      >
        Finalizar compra
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
