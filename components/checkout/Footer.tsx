"use client";

import { useRouter } from "next/navigation";

import { CartIcon, TrinioMark } from "./icons";

/**
 * Footer do checkout.
 * - À esquerda: botão "Voltar à sacola".
 * - À direita: assinatura "Compra segura Trinio®" (® em vermelho Trinio).
 * - Opcionalmente, linha do reCAPTCHA acima (usada na revisão do pedido).
 */
export default function Footer({
  showRecaptcha = false,
  backLabel = "Voltar à sacola",
  backHref = "/checkout/carrinho",
}: {
  showRecaptcha?: boolean;
  backLabel?: string;
  backHref?: string;
}) {
  const router = useRouter();

  return (
    <footer className="flex flex-col gap-8">
      {showRecaptcha && (
        <p className="text-[10px] leading-4 text-ink-300">
          Protegido por Google reCAPTCHA |{" "}
          <span className="underline">Termos</span> e{" "}
          <span className="underline">Privacidade</span>
        </p>
      )}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push(backHref)}
          className="flex items-center gap-[5px] rounded-pill border border-ink-200 px-[9px] py-[5px]"
        >
          <CartIcon size={12} className="text-ink-400" />
          <span className="text-[9px] font-semibold text-ink-400">
            {backLabel}
          </span>
        </button>
        <div className="flex items-center gap-2">
          <TrinioMark size={16} />
          <span className="text-[10px] font-medium text-ink-400">
            Compra segura <span className="text-trinio">Trinio®</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
