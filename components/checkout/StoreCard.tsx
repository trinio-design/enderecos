"use client";

import { BoltIcon, CheckIcon, PinIcon } from "./icons";

/**
 * Card de loja na busca/seleção de lojas para retirada.
 * Mostra seleção, nome, preço (Grátis), endereço, distância e prazo de retirada.
 */
export default function StoreCard({
  name,
  address,
  price = "Grátis",
  distance,
  eta = "Retire em até 4h",
  selected = false,
  onSelect,
}: {
  name: string;
  address: string;
  price?: string;
  distance: string;
  eta?: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full flex-col gap-3 rounded-card border bg-white p-4 text-left ${
        selected ? "border-black" : "border-hairline"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {selected ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-black">
              <CheckIcon size={11} className="text-white" />
            </span>
          ) : (
            <span className="h-5 w-5 shrink-0 rounded-pill border border-ink-200 bg-white" />
          )}
          <span className="text-[14px] font-bold text-black">{name}</span>
        </div>
        <span className="shrink-0 text-[14px] font-bold text-black">{price}</span>
      </div>
      <p className="text-[14px] leading-5 text-black">{address}</p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[12px] text-black">
          <PinIcon size={14} className="text-black" />
          {distance}
        </span>
        <span className="flex items-center gap-1 rounded-pill bg-[#2f80ed] px-2.5 py-1.5 text-[11px] font-semibold text-white">
          <BoltIcon size={12} />
          {eta}
        </span>
      </div>
    </button>
  );
}
