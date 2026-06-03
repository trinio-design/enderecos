"use client";

import { CheckIcon } from "./icons";

/**
 * Card de opção de frete (envio): nome, preço e prazo de entrega.
 */
export default function FreightCard({
  name,
  price,
  eta,
  selected = false,
  onSelect,
}: {
  name: string;
  price: string;
  eta: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full flex-col gap-1 rounded-card border bg-white p-4 text-left ${
        selected ? "border-black" : "border-hairline"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          {selected ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-pill bg-black">
              <CheckIcon size={11} className="text-white" />
            </span>
          ) : (
            <span className="h-5 w-5 rounded-pill border border-ink-200 bg-white" />
          )}
          <span className="text-[14px] font-semibold text-black">{name}</span>
        </div>
        <span className="text-[14px] font-bold text-black">{price}</span>
      </div>
      <p className="pl-8 text-[14px] text-ink-500">{eta}</p>
    </button>
  );
}
