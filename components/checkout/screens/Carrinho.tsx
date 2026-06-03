"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CtaButton from "../CtaButton";
import Divider from "../Divider";
import { ArrowRightIcon, CloseIcon, TrashIcon } from "../icons";

/**
 * Tela — Carrinho (resumo dos itens antes do checkout).
 */
export default function Carrinho() {
  const router = useRouter();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-[#f3f4f6] py-4">
      {/* Item */}
      <div className="flex gap-4 bg-white px-4 py-5">
        <div className="h-[150px] w-[105px] shrink-0 rounded-[4px] bg-ink-100" />
        <div className="flex flex-col gap-2">
          <p className="text-[14px] text-black">
            Camisa Ml Flanela Xadrez Amsterdam
          </p>
          <p className="text-[14px] font-bold text-black">R$ 599,00</p>
          <div className="flex gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-hairline text-[13px]">
              M
            </span>
            <span className="h-8 w-8 rounded-pill border border-hairline bg-black" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-[4px] border border-hairline px-3 py-1.5">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="text-[14px]">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <TrashIcon size={20} className="text-trinio" />
          </div>
          <label className="flex items-center gap-2 text-[13px] text-black">
            <span className="h-4 w-4 rounded-[3px] border border-hairline" />
            Embalar para presente
          </label>
        </div>
      </div>

      {/* Entrega */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-ink-500">Entrega</span>
          <span className="flex items-center gap-2 text-[14px] font-medium text-black">
            02729-060 <CloseIcon size={16} className="text-ink-400" />
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[14px] text-ink-500">Reserva Sp Higienopolis</span>
          <span className="text-[14px] font-medium text-success">Grátis</span>
        </div>
      </div>

      {/* Resumo */}
      <div className="flex flex-col gap-2 bg-white px-4 py-4">
        <div className="flex justify-between text-[14px] text-ink-400">
          <span>Cashback gerado para próxima compra</span>
          <span>R$ 59,90</span>
        </div>
        <div className="flex justify-between text-[14px] text-ink-500">
          <span>Subtotal</span>
          <span className="font-bold text-black">R$ 599,00</span>
        </div>
        <Divider />
        <div className="flex justify-between text-[14px]">
          <span className="text-ink-500">Total</span>
          <span className="font-bold text-black">R$ 599,00</span>
        </div>
        <CtaButton
          className="mt-3 !bg-success"
          icon={<ArrowRightIcon size={20} />}
          onClick={() => router.push("/checkout/loading")}
        >
          Ir para Checkout
        </CtaButton>
      </div>
    </div>
  );
}
