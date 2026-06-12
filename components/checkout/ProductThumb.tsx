"use client";

import { useCheckoutRouter } from "@/hooks/useCheckoutRouter";

export default function ProductThumb({ className }: { className?: string }) {
  const router = useCheckoutRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/checkout/detalhe-pacote")}
      className="shrink-0 self-start"
    >
      <img
        src="/tenis.jpg"
        alt="Produto"
        width={36}
        height={36}
        className={className ?? "h-9 w-9 rounded-lg object-cover"}
      />
    </button>
  );
}
