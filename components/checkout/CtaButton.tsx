import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Botão CTA principal preto, largura total. Aceita ícone opcional à esquerda.
 */
export default function CtaButton({
  children,
  icon,
  disabled,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-[4px] px-6 text-[16px] font-bold ${
        disabled
          ? "cursor-not-allowed bg-ink-100 text-ink-300"
          : "bg-black text-white"
      } ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
