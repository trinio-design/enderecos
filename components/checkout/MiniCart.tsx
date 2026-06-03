"use client";

import { useRouter } from "next/navigation";

import { BagIcon } from "./icons";

/**
 * Mini-carrinho do topo direito: preço + ícone de sacola com badge de quantidade.
 */
export default function MiniCart({
  total = "R$ 620,10",
  quantity = 3,
}: {
  total?: string;
  quantity?: number;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/checkout/carrinho")}
      className="flex items-center gap-1.5 rounded-[8px]"
      aria-label={`Carrinho, ${quantity} itens, total ${total}`}
    >
      <span className="text-[14px] font-bold leading-4 text-black">{total}</span>
      <span className="relative inline-flex">
        <BagIcon size={24} className="text-black" />
        <span className="absolute -right-1 -top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-pill bg-trinio px-[3px] text-[8px] font-bold leading-none text-white">
          {quantity}
        </span>
      </span>
    </button>
  );
}
