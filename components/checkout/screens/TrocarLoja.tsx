"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import StoreCard from "../StoreCard";
import SegmentToggle from "../SegmentToggle";
import AddressBox from "../AddressBox";
import {
  ArrowLeftCircleIcon,
  BoltIcon,
  CheckIcon,
  EditIcon,
  PinIcon,
  SearchIcon,
  StoreIcon,
} from "../icons";

// ---------------------------------------------------------------------------
// Sub-components shared across variants
// ---------------------------------------------------------------------------

function NavTabs({ active }: { active: "dados" | "entrega" | "pagamento" }) {
  const tabs = [
    { key: "dados", label: "DADOS" },
    { key: "entrega", label: "ENTREGA" },
    { key: "pagamento", label: "PAGAMENTO" },
  ] as const;
  return (
    <div className="flex w-full border-b border-[#d1d5db]">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={`flex flex-1 items-center justify-center py-[10px] ${
            active === tab.key
              ? "border-b-2 border-black"
              : ""
          }`}
        >
          <span
            className={`text-[12px] ${
              active === tab.key
                ? "font-bold text-[#374151]"
                : "font-medium text-[#6b7280]"
            }`}
          >
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function RadioButton({ selected }: { selected: boolean }) {
  return selected ? (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black">
      <CheckIcon size={8} className="text-white" />
    </span>
  ) : (
    <span className="h-4 w-4 shrink-0 rounded-full border border-[rgba(0,0,0,0.16)] bg-white" />
  );
}

function WarningBanner({
  text,
  extra,
}: {
  text: React.ReactNode;
  extra?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-1 flex-col gap-2">
        {/* Warning icon (info circle) */}
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" stroke="#374151" strokeWidth="1.6" />
          <path d="M12 11v5" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="8" r="1" fill="#374151" />
        </svg>
        <p className="text-[12px] font-medium leading-normal text-black">
          {text}
        </p>
      </div>
      {extra && (
        <span className="shrink-0 text-[12px] font-bold text-black">{extra}</span>
      )}
    </div>
  );
}

function PackagePill({ label, icon }: { label: string; icon: "store" | "package" }) {
  return (
    <span className="inline-flex h-6 items-center gap-1 rounded-full bg-[#0a0a0a] px-2">
      {icon === "store" ? (
        <StoreIcon size={14} className="text-white" />
      ) : (
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 9.5 12 4l9 5.5V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M3 9.5 12 15l9-5.5M12 15V21" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )}
      <span className="text-[10px] font-semibold text-white">{label}</span>
    </span>
  );
}

function DeliverySubCard({
  pill,
  pillIcon,
  title,
  subtitle,
  price,
  address,
}: {
  pill: string;
  pillIcon: "store" | "package";
  title: string;
  subtitle: string;
  price: string;
  address?: string;
}) {
  return (
    <div className="flex flex-col gap-[14px]">
      <PackagePill label={pill} icon={pillIcon} />
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-col">
          <p className="text-[14px] font-bold leading-5 text-black">{title}</p>
          <p className="text-[14px] leading-5 text-black">{subtitle}</p>
        </div>
        <span className="shrink-0 text-[14px] font-bold text-black">{price}</span>
      </div>
      {address && (
        <p className="text-[12px] leading-[1.3] text-black">{address}</p>
      )}
      {/* product image placeholder */}
      <div className="h-9 w-9 rounded-lg border border-[#d1d5db] bg-[#f3f4f6]" />
    </div>
  );
}

function MultiplePackagesHeader({
  label,
  badgeA,
  badgeB,
  icon,
}: {
  label: string;
  badgeA: string;
  badgeB: string;
  icon: "truck" | "store";
}) {
  return (
    <div className="flex flex-col gap-[12px] rounded-tl-lg rounded-tr-lg border border-[#d6d6d6] bg-[#f3f4f6] p-4">
      <div className="flex items-center gap-2">
        {/* info icon */}
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#374151" strokeWidth="1.6" />
          <path d="M12 11v5" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="8" r="1" fill="#374151" />
        </svg>
        <span className="text-[14px] font-semibold text-black">Múltiplos pacotes</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          {icon === "truck" ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 7h13v10H1V7ZM14 10h4l3 4v3h-7V10Z"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="5.5" cy="18.5" r="1.5" stroke="#374151" strokeWidth="1.5" />
              <circle cx="18.5" cy="18.5" r="1.5" stroke="#374151" strokeWidth="1.5" />
            </svg>
          ) : (
            <StoreIcon size={14} className="text-[#374151]" />
          )}
          <span className="text-[12px] font-bold text-[#374151]">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded px-1 text-[12px] font-medium text-[#374151] bg-[#d1d5db]">
            {badgeA}
          </span>
          <span className="rounded px-1 text-[12px] font-medium text-[#374151] bg-[#d1d5db]">
            {badgeB}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant 1: 1-click-alterarretirada (node 4292-11484)
// Logged-in flow: Opções de retirada toggle + current store card with warning
// + address box + "Múltiplos pacotes" section
// ---------------------------------------------------------------------------

function Variant1Click({ router }: { router: ReturnType<typeof useRouter> }) {
  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      {/* Voltar + title + toggle */}
      <div className="flex flex-col gap-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[14px] font-semibold text-black"
        >
          <ArrowLeftCircleIcon size={22} className="text-black" />
          Voltar
        </button>

        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-black">Opções de retirada</h2>
          <SegmentToggle
            options={[
              { key: "envio", label: "Envio" },
              { key: "retirada", label: "Retirada" },
            ]}
            value="retirada"
            onChange={(key) =>
              key === "envio" && router.push("/checkout/trocar-frete")
            }
          />
        </div>
      </div>

      {/* CEP search */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between rounded bg-[#f3f4f6] px-3 py-3">
          <span className="text-[14px] font-medium text-black">CEP 34859-340</span>
          <SearchIcon size={20} className="text-black" />
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-[14px] text-[#374151]"
        >
          <PinIcon size={18} className="text-[#374151]" />
          <span className="underline">Usar minha localização</span>
        </button>
      </div>

      {/* Store card — Retirada 1 */}
      <div className="flex flex-col overflow-hidden rounded-lg border border-[rgba(0,0,0,0.16)] bg-white">
        {/* top section */}
        <div className="flex flex-col gap-[14px] px-4 pt-4">
          <PackagePill label="Retirada 1" icon="store" />
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-col">
              <p className="text-[14px] font-bold leading-5 text-black">Retirada em Loja</p>
              <p className="text-[14px] leading-5 text-black">Disponível em até 4 horas</p>
            </div>
            <span className="text-[14px] font-bold text-black">Grátis</span>
          </div>
          {/* product thumbnail */}
          <div className="h-9 w-9 rounded-lg border border-[#d1d5db] bg-[#f3f4f6]" />
        </div>

        {/* warning + responsible */}
        <div className="flex flex-col gap-3 px-4 pb-4 pt-4">
          <WarningBanner
            text={
              <>
                <strong>1 item está indisponível</strong>
                {" para retirada nesta loja e será enviado com custo adicional."}
              </>
            }
            extra="+ R$ 20,00"
          />
          <div className="h-px rounded bg-[#d1d5db]" />
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-semibold leading-[18px] text-black">
              Responsável pela retirada
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[14px] leading-[18px] text-black">Tamy Müzel</span>
              <button
                type="button"
                onClick={() => router.push("/checkout/alterar-endereco")}
                aria-label="Editar responsável"
              >
                <EditIcon size={20} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Endereço do envio */}
      <AddressBox
        title="Endereço do envio"
        lines={["Rua Lauro Muller, 116 – piso 3 – Lj 331 –", "Botafogo, Rio de Janeiro"]}
        editHref="/checkout/alterar-endereco"
      />

      {/* Múltiplos pacotes */}
      <div className="flex flex-col overflow-hidden rounded-lg border border-[#d6d6d6] bg-white">
        <MultiplePackagesHeader
          label="2 entregas"
          badgeA="1 a 2 dias úteis"
          badgeB="R$20,00"
          icon="truck"
        />
        <div className="flex flex-col gap-6 px-4 pb-4 pt-4">
          <DeliverySubCard
            pill="Entrega 1"
            pillIcon="package"
            title="Frete econômico"
            subtitle="Chegará até 18/09/26"
            price="R$12,90"
          />
          <div className="h-px rounded bg-[#d1d5db]" />
          <DeliverySubCard
            pill="Entrega 2"
            pillIcon="package"
            title="Frete expresso"
            subtitle="Chegará até 18/09/26"
            price="R$12,90"
          />
        </div>
      </div>

      <CtaButton onClick={() => router.back()}>Continuar</CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant 2: guest-retirada+entrega (node 4315-11667)
// Guest flow: 3-step nav + freight cards + selected store card + Múltiplos pacotes
// ---------------------------------------------------------------------------

function VariantGuestMixed({ router }: { router: ReturnType<typeof useRouter> }) {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<"economico" | "expresso" | "retirada">(
    "retirada"
  );

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <NavTabs active="entrega" />

      {/* Title */}
      <h1 className="text-[16px] font-bold text-black">
        Selecione a entrega / retirada
      </h1>

      <div className="flex flex-col gap-3">
        {/* Frete econômico */}
        <button
          type="button"
          onClick={() => setSelected("economico")}
          aria-pressed={selected === "economico"}
          className={`flex w-full flex-col gap-3 rounded-lg border bg-white p-4 text-left ${
            selected === "economico" ? "border-black" : "border-[rgba(0,0,0,0.16)]"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <RadioButton selected={selected === "economico"} />
              <span className="text-[14px] font-bold text-black">Frete econômico</span>
            </div>
            <span className="text-[14px] font-bold text-black">R$12,90</span>
          </div>
          <p className="text-[14px] leading-5 text-black">3 pacotes de 1 a 2 dias úteis</p>
        </button>

        {/* Frete expresso */}
        <button
          type="button"
          onClick={() => setSelected("expresso")}
          aria-pressed={selected === "expresso"}
          className={`flex w-full flex-col gap-3 rounded-lg border bg-white p-4 text-left ${
            selected === "expresso" ? "border-black" : "border-[rgba(0,0,0,0.16)]"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <RadioButton selected={selected === "expresso"} />
              <span className="text-[14px] font-bold text-black">Frete expresso</span>
            </div>
            <span className="text-[14px] font-bold text-black">R$22,90</span>
          </div>
          <p className="text-[14px] leading-5 text-black">3 pacotes de 1 a 6 dias úteis</p>
        </button>

        {/* Retirada em Loja — selected + expanded */}
        <div className="flex flex-col overflow-hidden rounded-lg border border-black bg-white">
          <button
            type="button"
            onClick={() => setSelected("retirada")}
            className="flex flex-col gap-3 p-4 text-left"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <RadioButton selected={selected === "retirada"} />
                <span className="text-[14px] font-bold text-black">Retirada em Loja</span>
              </div>
              <span className="text-[14px] font-bold text-black">Grátis</span>
            </div>
            <p className="text-[14px] leading-5 text-black">Disponível em até 4 horas</p>
            <div className="flex flex-col gap-1">
              <p className="text-[12px] font-semibold leading-5 text-black">
                Reserva SP Higienópolis
              </p>
              <p className="text-[12px] leading-[1.3] text-black">
                Avenida Higienópolis, 618 – Loja 2005 Piso Pacaembu – 01238-000 São Paulo, SP
              </p>
            </div>

            {selected === "retirada" && (
              <div className="flex w-full flex-col gap-3 pt-1">
                <div className="h-px rounded bg-[#d1d5db]" />
                <WarningBanner
                  text={
                    <>
                      <strong>1 item está indisponível</strong>
                      {" para retirada nesta loja e será enviado com custo adicional."}
                    </>
                  }
                  extra="+ R$ 20,00"
                />
                <div className="h-px rounded bg-[#d1d5db]" />
                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-semibold leading-[18px] text-black">
                    Responsável pela retirada
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] leading-[18px] text-black">Tamy Müzel</span>
                    <EditIcon size={20} className="text-black" />
                  </div>
                </div>
              </div>
            )}
          </button>

          {/* "Escolher outra loja" footer button */}
          <button
            type="button"
            onClick={() => router.push(`/checkout/guest-trocar-loja?${searchParams.toString()}`)}
            className="flex items-center justify-center gap-3 border-t border-[#d6d6d6] bg-[#e5e7eb] py-3"
          >
            <StoreIcon size={18} className="text-black" />
            <span className="text-[12px] font-semibold text-black">Escolher outra loja</span>
          </button>
        </div>
      </div>

      {/* Múltiplos pacotes */}
      <div className="flex flex-col overflow-hidden rounded-lg border border-[#d6d6d6] bg-white">
        <MultiplePackagesHeader
          label="Retirada"
          badgeA="4 horas a 2 dias"
          badgeB="Grátis"
          icon="store"
        />
        <div className="flex flex-col gap-6 px-4 pb-4 pt-4">
          <DeliverySubCard
            pill="Retirada 1"
            pillIcon="store"
            title="Retirada em Loja"
            subtitle="Disponível em até 4 horas"
            price="Grátis"
          />
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-semibold leading-[18px] text-black">
              Responsável pela retirada
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-black">Tamy Müzel</span>
              <EditIcon size={20} className="text-black" />
            </div>
          </div>
          <div className="h-px rounded bg-[#d1d5db]" />
          <DeliverySubCard
            pill="Entrega 1"
            pillIcon="package"
            title="Frete econômico"
            subtitle="Chegará até 18/09/26"
            price="R$12,90"
            address="Rua Lauro Muller, 116 – piso 3 – Lj 331 – Botafogo, Rio de Janeiro"
          />
        </div>
      </div>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant 3: guest-trocar-loja (node 4322-1439)
// Guest store picker: 3-step nav + CEP search + 2 store cards
// (this is the existing TrocarLoja behavior, now also with a nav tab)
// ---------------------------------------------------------------------------

const STORES = [
  {
    name: "Loja Rio Sul",
    address: "Rua Lauro Muller, 116 – piso 3 – Lj 331 – Botafogo, Rio de Janeiro",
    distance: "7 km",
    eta: "Retire em até 4h",
  },
  {
    name: "Loja Rio Norte",
    address: "Rua Laura Miller, 116 – piso 3 – Lj 331 – Palmas, São Paulo",
    distance: "8 km",
    eta: "Retire em até 4h",
  },
];

function VariantGuestPicker({ router }: { router: ReturnType<typeof useRouter> }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <NavTabs active="entrega" />

      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[14px] font-semibold text-black"
      >
        <ArrowLeftCircleIcon size={22} className="text-black" />
        Voltar
      </button>

      {/* CEP search */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between rounded bg-[#f3f4f6] px-3 py-3">
          <span className="text-[14px] font-medium text-black">CEP 34859-340</span>
          <SearchIcon size={20} className="text-black" />
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-[14px] text-[#374151]"
        >
          <PinIcon size={18} className="text-[#374151]" />
          <span className="underline">Usar minha localização</span>
        </button>
      </div>

      {/* Store cards */}
      <div className="flex flex-col gap-3">
        {STORES.map((store, i) => (
          <StoreCard
            key={store.name}
            {...store}
            selected={selected === i}
            onSelect={() => setSelected(i)}
          />
        ))}
      </div>

      <CtaButton onClick={() => router.back()}>Continuar</CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export type TrocarLojaVariant = "1click" | "guest-mixed" | "guest-picker";

/**
 * Tela — Trocar loja / opções de retirada.
 *
 * Variantes controladas pela prop `variant`:
 * - "1click" (padrão): fluxo 1-click de usuário logado com toggle Envio/Retirada,
 *   aviso de indisponibilidade e múltiplos pacotes (node 4292-11484).
 * - "guest-mixed": fluxo guest com nav 3-steps, seleção mista retirada+entrega
 *   (node 4315-11667).
 * - "guest-picker": picker de loja para guest com busca por CEP e 2 cards de loja
 *   (node 4322-1439).
 */
export default function TrocarLoja({
  variant = "guest-picker",
}: {
  variant?: TrocarLojaVariant;
}) {
  const router = useRouter();

  if (variant === "1click") {
    return <Variant1Click router={router} />;
  }

  if (variant === "guest-mixed") {
    return <VariantGuestMixed router={router} />;
  }

  return <VariantGuestPicker router={router} />;
}
