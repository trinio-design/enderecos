import type { ButtonHTMLAttributes } from "react";

/**
 * Botão "pill" com borda fina, usado para ações secundárias (Editar / Alterar).
 */
export default function PillButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`rounded-pill border border-ink-200 px-2.5 py-[5px] text-[10px] font-semibold text-ink-500 transition-colors hover:bg-ink-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
