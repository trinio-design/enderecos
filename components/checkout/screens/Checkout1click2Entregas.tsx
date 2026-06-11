"use client";

import { useState } from "react";
import { Package, Truck } from "lucide-react";
import { useCheckoutRouter } from "@/hooks/useCheckoutRouter";

import CtaButton from "../CtaButton";
import Divider from "../Divider";
import Footer from "../Footer";
import Header from "../Header";
import PaymentCard from "../PaymentCard";
import PillButton from "../PillButton";
import {
  BarcodeIcon,
  CreditCardIcon,
  EditIcon,
  LockIcon,
  PixIcon,
  PlusIcon,
} from "../icons";

type Payment = "credito" | "pix" | "boleto";

// ── Sub-components ────────────────────────────────────────────────────────────

function EntregaPill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-6 w-fit items-center gap-1.5 rounded-full bg-[#0a0a0a] px-2.5">
      <Package size={12} className="text-white" strokeWidth={1.8} />
      <span className="text-[12px] font-semibold text-white">{label}</span>
    </span>
  );
}

function InfoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[4px] bg-[#e5e7eb] px-1.5 py-0.5 text-[12px] font-medium text-[#374151]">
      {children}
    </span>
  );
}

function ProductThumb() {
  return (
    <img
      src="/tenis.jpg"
      alt="Produto"
      width={36}
      height={36}
      className="h-9 w-9 rounded-lg object-cover"
    />
  );
}

function AddressRow({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg bg-[#f3f4f6] px-3 py-2">
      <p className="text-[12px] leading-[1.4] text-ink-500">
        Rua João da Silva, 123 - Ap. 32
        <br />
        Botafogo, Rio de Janeiro
      </p>
      <button type="button" onClick={onEdit} aria-label="Editar endereço" className="mt-0.5 shrink-0">
        <EditIcon size={16} className="text-black" />
      </button>
    </div>
  );
}

// ── Two-deliveries grouped card ───────────────────────────────────────────────

function TwoDeliveriesCard({ onEditAddress }: { onEditAddress: () => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#d6d6d6] bg-white">
      {/* Header banner */}
      <div className="flex flex-col gap-3 bg-[#f3f4f6] px-4 py-4">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-black">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="8" r="1" fill="currentColor" />
          </svg>
          <span className="text-[14px] font-semibold text-black">Múltiplos pacotes</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Truck size={14} className="text-[#374151]" strokeWidth={1.8} />
            <span className="text-[12px] font-bold text-[#374151]">2 entregas</span>
          </div>
          <div className="flex items-center gap-2">
            <InfoBadge>1 a 2 dias úteis</InfoBadge>
            <InfoBadge>R$23,80</InfoBadge>
          </div>
        </div>
      </div>

      {/* Package list */}
      <div className="flex flex-col divide-y divide-[#e5e7eb]">
        {/* Entrega 1 */}
        <div className="flex flex-col gap-3 px-4 py-4">
          <EntregaPill label="Entrega 1" />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Frete econômico</p>
              <p className="font-normal text-ink-500">Chegará até 18/09/26</p>
            </div>
            <p className="font-bold">R$12,90</p>
          </div>
          <ProductThumb />
        </div>

        {/* Entrega 2 */}
        <div className="flex flex-col gap-3 px-4 py-4">
          <EntregaPill label="Entrega 2" />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Frete expresso</p>
              <p className="font-normal text-ink-500">Chegará até 18/09/26</p>
            </div>
            <p className="font-bold">R$12,90</p>
          </div>
          <ProductThumb />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

/**
 * Tela — Revisão 1-click com 2 entregas (múltiplos pacotes, sem CEP, sem método pré-selecionado)
 */
export default function Checkout1click2Entregas() {
  const router = useCheckoutRouter();
  const [payment, setPayment] = useState<Payment>("pix");

  function editAddress() {
    router.push("/checkout/alterar-endereco");
  }

  return (
    <div className="flex min-h-screen flex-col gap-10 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <div className="flex flex-col gap-6">
        <h1 className="text-[22px] font-bold leading-7 text-ink-700">
          Revisar dados do pedido
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <p className="text-[14px] font-medium leading-5 text-black">
            victoria.scholte@gmail.com
          </p>
          <p className="text-[9px] font-medium text-ink-300">
            Não é você?{" "}
            <button type="button" className="font-bold underline">
              Sair
            </button>
          </p>
        </div>

        <Divider />

        {/* Entrega ou retirada */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold leading-6 text-black">
              Entrega ou retirada
            </h2>
            <PillButton onClick={() => router.push("/checkout/1click-alterar-frete")}>
              Editar
            </PillButton>
          </div>

          <TwoDeliveriesCard onEditAddress={editAddress} />
        </section>

        <Divider />

        {/* Forma de pagamento */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-[14px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold leading-6 text-black">
                Forma de pagamento
              </h2>
              <PillButton>Editar</PillButton>
            </div>
            <button type="button" className="flex items-center gap-2">
              <PlusIcon size={16} className="text-ink-400" />
              <span className="text-[14px] font-semibold text-ink-400">
                Cupom ou vale-presente
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <PaymentCard
              label="Cartão de crédito"
              icon={<CreditCardIcon size={24} />}
              selected={payment === "credito"}
              onSelect={() => setPayment("credito")}
            />
            <PaymentCard
              label="Pix"
              icon={<PixIcon size={22} />}
              selected={payment === "pix"}
              onSelect={() => setPayment("pix")}
            >
              {`Ao clicar em "Pagar", seu código Pix será gerado.`}
            </PaymentCard>
            <PaymentCard
              label="Boleto"
              icon={<BarcodeIcon size={24} />}
              selected={payment === "boleto"}
              onSelect={() => setPayment("boleto")}
            />
          </div>
        </section>

        {/* Endereço de cobrança */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-bold leading-5 text-black">
              Endereço de cobrança
            </p>
            <PillButton onClick={() => router.push("/checkout/alterar-endereco-cobranca")}>
              Alterar
            </PillButton>
          </div>
          <div className="text-[14px] font-medium leading-[18px] text-black">
            <p>Rua João da Silva, 123 - Ap. 32</p>
            <p>Botafogo, Rio de Janeiro</p>
          </div>
        </div>

        <CtaButton icon={<LockIcon size={24} />}>
          Finalizar compra
        </CtaButton>
      </div>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
