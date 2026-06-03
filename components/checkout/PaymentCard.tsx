"use client";

import type { ReactNode } from "react";

import { CheckIcon } from "./icons";

/**
 * Card de opção de pagamento.
 * - Não selecionado: radio vazio + borda fina.
 * - Selecionado: radio com check verde (#38b74c) + borda preta + conteúdo extra.
 */
export default function PaymentCard({
  label,
  icon,
  selected = false,
  onSelect,
  children,
}: {
  label: string;
  icon: ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  children?: ReactNode;
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
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          {selected ? (
            <span className="flex h-4 w-4 items-center justify-center rounded-pill bg-success">
              <CheckIcon size={9} className="text-white" />
            </span>
          ) : (
            <span className="h-4 w-4 rounded-pill border border-hairline bg-white" />
          )}
          <span className="text-[14px] font-semibold text-black">{label}</span>
        </div>
        <span className="text-black">{icon}</span>
      </div>
      {selected && children && (
        <p className="text-[14px] font-medium leading-5 text-ink-700">
          {children}
        </p>
      )}
    </button>
  );
}
