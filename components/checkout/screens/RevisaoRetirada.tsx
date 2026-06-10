"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
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
  StoreIcon,
} from "../icons";

type Payment = "credito" | "pix" | "boleto";

/**
 * Variant keys:
 *  ?v=1  (default) — retirada única, sem botão "Escolher outra loja"  [4222-7928]
 *  ?v=2            — retirada única + botão "Escolher outra loja"     [4269-8542]
 *  ?v=3            — múltiplos pacotes, 2 retiradas                   [4292-11864]
 *  ?v=4            — múltiplos pacotes, 1 retirada + 1 entrega        [4315-1327]
 */

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

/** Pill dark badge used in multi-package cards (e.g. "Retirada 1") */
function PackagePill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex h-6 items-center gap-1 rounded-full bg-[#0a0a0a] px-2">
      {icon}
      <span className="text-[12px] font-semibold text-white">{label}</span>
    </span>
  );
}

/** "Múltiplos pacotes" header banner shown at the top of the grouped card */
function MultiPackageHeader({
  showPickup,
  showDelivery,
}: {
  showPickup: boolean;
  showDelivery: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-t-lg border border-[#d6d6d6] bg-[#f3f4f6] p-4">
      <div className="flex items-center gap-2">
        {/* info icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 text-black"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
        <span className="text-[14px] font-semibold text-black">Múltiplos pacotes</span>
      </div>
      <div className="flex flex-col gap-1">
        {showPickup && (
          <div className="flex items-center gap-1">
            <StoreIcon size={14} className="text-[#374151]" />
            <span className="text-[12px] font-bold text-[#374151]">Retirada</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          {showPickup && (
            <>
              <span className="rounded-[4px] bg-[#e5e7eb] px-1 text-[12px] font-medium text-[#374151]">
                4 horas a 2 dias
              </span>
              <span className="rounded-[4px] bg-[#e5e7eb] px-1 text-[12px] font-medium text-[#374151]">
                Grátis
              </span>
            </>
          )}
          {showDelivery && !showPickup && (
            <span className="rounded-[4px] bg-[#e5e7eb] px-1 text-[12px] font-medium text-[#374151]">
              Entrega
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/** Product thumbnail placeholder (36×36) */
function ProductThumb() {
  return (
    <div className="h-9 w-9 rounded-lg border border-[#d1d5db] bg-[#f3f4f6]" />
  );
}

/** Responsible-for-pickup row */
function PickupResponsible({ onEditClick }: { onEditClick?: () => void }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] font-semibold leading-[18px] text-black">
        Responsável pela retirada
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[14px] leading-[18px] text-black">Tamy Müzel</span>
        <button
          type="button"
          onClick={onEditClick}
          aria-label="Editar responsável"
        >
          <EditIcon size={20} className="text-black" />
        </button>
      </div>
    </div>
  );
}

/** User+check icon SVG */
function UserCheckIcon({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="19" cy="13" r="7" stroke="#F79E1B" strokeWidth="2" />
      <path
        d="M5 33c0-7.732 6.268-14 14-14"
        stroke="#F79E1B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="27" cy="29" r="6" fill="#F79E1B" />
      <path
        d="M24 29l2 2 4-4"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Read-only field used inside the edit-responsible drawer */
function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-[4px] bg-[#f3f4f6] px-3 py-1">
      <span className="text-[12px] font-bold leading-4 text-black">{label}</span>
      <span className="text-[16px] font-normal leading-6 text-black">{value}</span>
    </div>
  );
}

/** Bottom drawer for editing the pickup responsible */
function EditResponsibleDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex w-full flex-col rounded-t-[12px] bg-white">
        {/* Drag handle */}
        <div className="flex justify-center pb-2 pt-4">
          <div className="h-1 w-[45px] rounded-full bg-[#e5e7eb]" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 p-6">
          {/* Orange icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F79E1B]/16">
            <UserCheckIcon size={38} />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-[24px] font-bold leading-tight text-black">
              Quem vai retirar o pedido?
            </h2>

            <div className="flex flex-col gap-3">
              <ReadOnlyField label="Nome" value="JOSÉ OLIVEIRA" />
              <ReadOnlyField label="CPF" value="093.675.113-99" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center rounded-[4px] bg-black"
            >
              <span className="text-[16px] font-bold text-white">Atualizar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center rounded-[4px] bg-[#f3f4f6]"
            >
              <span className="text-[16px] font-bold text-black">Cancelar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Security disclaimer paragraph */
function SecurityNote() {
  return (
    <p className="text-[12px] font-medium leading-normal text-ink-500">
      Para garantir a segurança da sua experiência, o pedido poderá ser
      retirado apenas pelo titular da compra, mediante apresentação de
      documento oficial com foto.
    </p>
  );
}

// ---------------------------------------------------------------------------
// Variant: single pickup card (used in v=1 and v=2)
// ---------------------------------------------------------------------------
function SinglePickupCard({
  showChooseStore,
  onEditResponsible,
}: {
  showChooseStore: boolean;
  onEditResponsible: () => void;
}) {
  const router = useCheckoutRouter();
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
      {/* Top content */}
      <div className="flex flex-col gap-[14px] px-4 pt-4">
        {/* Title row */}
        <div className="flex items-start justify-between leading-5 text-[14px] text-black">
          <div className="flex flex-col">
            <p className="font-bold">Retirada em Loja</p>
            <p className="font-normal">Disponível em até 4 horas</p>
          </div>
          <p className="font-bold">Grátis</p>
        </div>

        <Divider />

        {/* Store info */}
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold leading-[18px] text-black">
            Loja Copacabana
          </p>
          <p className="text-[14px] leading-[18px] text-black">
            Av. Nossa Sra. de Copacabana, 722, Copacabana - Rio de Janeiro
          </p>
        </div>

        <Divider />

        {/* Responsible */}
        <PickupResponsible onEditClick={onEditResponsible} />
      </div>

      {/* Security note */}
      <div className="px-4 pb-4 pt-3">
        <SecurityNote />
      </div>

      {/* Choose another store button (v=2 only) */}
      {showChooseStore && (
        <button
          type="button"
          onClick={() => router.push("/checkout/trocar-loja")}
          className="flex items-center justify-center gap-3 border-t border-[#e5e7eb] bg-[#e5e7eb] py-3"
        >
          <StoreIcon size={18} className="text-black" />
          <span className="text-[12px] font-semibold leading-[18px] text-black">
            Escolher outra loja
          </span>
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant: 2 pickups grouped card (v=3)
// ---------------------------------------------------------------------------
function TwoPickupsCard({ onEditResponsible }: { onEditResponsible: () => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-[#d6d6d6] bg-white">
      <MultiPackageHeader showPickup showDelivery={false} />

      <div className="flex flex-col gap-6 px-4 pb-4 pt-4">
        {/* Retirada 1 */}
        <div className="flex flex-col gap-[14px]">
          <PackagePill
            icon={<StoreIcon size={14} className="text-white" />}
            label="Retirada 1"
          />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Retirada em Loja</p>
              <p className="font-normal">Disponível em até 4 horas</p>
            </div>
            <p className="font-bold">Grátis</p>
          </div>
          <ProductThumb />
        </div>

        <Divider />

        {/* Retirada 2 */}
        <div className="flex flex-col gap-[14px]">
          <PackagePill
            icon={<StoreIcon size={14} className="text-white" />}
            label="Retirada 2"
          />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Retirada em Loja</p>
              <p className="font-normal">Pronto em até 2 dias</p>
            </div>
            <p className="font-bold">Grátis</p>
          </div>
          <ProductThumb />

          <Divider />

          <PickupResponsible onEditClick={onEditResponsible} />
        </div>
      </div>

      {/* Security note */}
      <div className="px-4 pb-4">
        <SecurityNote />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Package icon (box) for delivery pill
// ---------------------------------------------------------------------------
function PackageIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 8l-9-5-9 5v8l9 5 9-5V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M3 8l9 5M12 21V13M21 8l-9 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Variant: mixed pickup + delivery grouped card (v=4)
// ---------------------------------------------------------------------------
function MixedPickupDeliveryCard({ onEditResponsible }: { onEditResponsible: () => void }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-[#d6d6d6] bg-white">
      <MultiPackageHeader showPickup showDelivery />

      <div className="flex flex-col gap-6 px-4 pb-4 pt-4">
        {/* Retirada 1 */}
        <div className="flex flex-col gap-[14px]">
          <PackagePill
            icon={<StoreIcon size={14} className="text-white" />}
            label="Retirada 1"
          />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Retirada em Loja</p>
              <p className="font-normal">Disponível em até 4 horas</p>
            </div>
            <p className="font-bold">Grátis</p>
          </div>
          <ProductThumb />

          {/* Responsible for pickup */}
          <PickupResponsible onEditClick={onEditResponsible} />
        </div>

        <Divider />

        {/* Entrega 1 */}
        <div className="flex flex-col gap-[14px]">
          <PackagePill
            icon={<PackageIcon size={14} className="text-white" />}
            label="Entrega 1"
          />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Frete econômico</p>
              <p className="font-normal">Chegará até 18/09/26</p>
            </div>
            <p className="font-bold">R$12,90</p>
          </div>
          <p className="text-[12px] leading-[1.3] text-black">
            Rua Lauro Muller, 116 - piso 3 - Lj 331 - Botafogo, Rio de Janeiro
          </p>
          <ProductThumb />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Payment + billing address section (shared)
// ---------------------------------------------------------------------------
function PaymentAndBillingSection({
  showBillingAddress,
}: {
  showBillingAddress: boolean;
}) {
  const router = useCheckoutRouter();
  const [payment, setPayment] = useState<Payment>("pix");

  return (
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

      {showBillingAddress && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-bold leading-5 text-black">
              Endereço de cobrança
            </p>
            <PillButton
              onClick={() => router.push("/checkout/alterar-endereco-cobranca")}
            >
              Alterar
            </PillButton>
          </div>
          <div className="text-[14px] font-medium leading-[18px] text-black">
            <p>Rua João da Silva, 123 - Ap. 32</p>
            <p>Botafogo, Rio de Janeiro</p>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Tela — Revisão do pedido (modo Retirada em loja).
 *
 * Variants (query param ?v=):
 *   1 — retirada única sem "Escolher outra loja"  (default)
 *   2 — retirada única com "Escolher outra loja"
 *   3 — 2 retiradas (múltiplos pacotes)
 *   4 — 1 retirada + 1 entrega (múltiplos pacotes, misto)
 */
export default function RevisaoRetirada() {
  const router = useCheckoutRouter();
  const searchParams = useSearchParams();
  const v = searchParams.get("v") ?? "1";

  const isMixed = v === "4";
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  return (
    <div className="flex min-h-screen flex-col gap-10 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <div className="flex flex-col gap-6">
        {/* Título + identificação */}
        <h1 className="text-[22px] font-bold leading-7 text-ink-700">
          Revisar dados do pedido
        </h1>

        <div className="flex flex-col">
          <p className="text-[14px] font-medium leading-5 text-black">
            victoria.scholte@gmail.com
          </p>
          <p className="text-[9px] font-medium text-ink-300">
            Não é você?{" "}
            <button
              type="button"
              onClick={() => router.push("/checkout/otp")}
              className="font-bold underline"
            >
              Sair
            </button>
          </p>
        </div>

        <Divider />

        {/* Entrega ou retirada */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold leading-6 text-black">
              Entrega ou retirada
            </h2>
            <PillButton
              onClick={() => router.push("/checkout/opcoes-retirada")}
            >
              Editar
            </PillButton>
          </div>

          {/* v=4: address box above the multi-package card */}
          {isMixed && (
            <div className="flex items-start justify-between gap-3 rounded-lg bg-ink-100 px-4 py-3">
              <div className="flex flex-col gap-1">
                <p className="text-[14px] font-semibold text-black">
                  Endereço do envio
                </p>
                <p className="text-[12px] leading-[1.3] text-ink-500">
                  Rua João da Silva, 123 - Ap. 32
                  <br />
                  Botafogo, Rio de Janeiro
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.push("/checkout/alterar-endereco-cobranca")}
                aria-label="Editar endereço"
                className="shrink-0"
              >
                <EditIcon size={20} className="text-black" />
              </button>
            </div>
          )}

          {/* Pickup / delivery card(s) */}
          {(v === "1" || v === "2") && (
            <SinglePickupCard
              showChooseStore={v === "2"}
              onEditResponsible={() => setShowEditDrawer(true)}
            />
          )}
          {v === "3" && (
            <TwoPickupsCard onEditResponsible={() => setShowEditDrawer(true)} />
          )}
          {v === "4" && (
            <MixedPickupDeliveryCard onEditResponsible={() => setShowEditDrawer(true)} />
          )}
        </section>

        <Divider />

        {/* Payment section — v=3 doesn't show billing address */}
        <PaymentAndBillingSection showBillingAddress={v !== "3"} />

        {/* v=3 billing address below payment cards */}
        {v === "3" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-bold leading-5 text-black">
                Endereço de cobrança
              </p>
              <PillButton
                onClick={() => router.push("/checkout/alterar-endereco-cobranca")}
              >
                Alterar
              </PillButton>
            </div>
            <div className="text-[14px] font-medium leading-[18px] text-black">
              <p>Rua João da Silva, 123 - Ap. 32</p>
              <p>Botafogo, Rio de Janeiro</p>
            </div>
          </div>
        )}

        <CtaButton
          icon={<LockIcon size={24} />}
          onClick={() => router.push("/checkout/otp")}
        >
          Finalizar compra
        </CtaButton>
      </div>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>

      {showEditDrawer && (
        <EditResponsibleDrawer onClose={() => setShowEditDrawer(false)} />
      )}
    </div>
  );
}
