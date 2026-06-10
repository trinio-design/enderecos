"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CtaButton from "../CtaButton";
import Divider from "../Divider";
import { ArrowRightIcon, CloseIcon, TrashIcon } from "../icons";

const productImg =
  "https://www.figma.com/api/mcp/asset/aeddb966-e85b-4904-bd0b-d6e3de4bd674";

/**
 * Tela — Carrinho (resumo dos itens antes do checkout).
 */
export default function Carrinho() {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [vendorCode, setVendorCode] = useState("02729-060");
  const [coupon, setCoupon] = useState("02729-060");

  return (
    <div className="flex min-h-screen flex-col gap-3 bg-[#f3f4f6] pb-6">
      {/* ── Produto ─────────────────────────────────────────────── */}
      <div className="flex gap-4 bg-white px-4 py-5">
        {/* Imagem do produto */}
        <div className="h-[150px] w-[105px] shrink-0 overflow-hidden rounded-[4px] bg-[#e5e7eb]">
          <img
            src={productImg}
            alt="Camisa Ml Flanela Xadrez Amsterdam"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Detalhes */}
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-[14px] leading-[1.4] text-black">
            Camisa Ml Flanela Xadrez Amsterdam
          </p>

          <p className="text-[14px] font-bold text-black">R$ 599,00</p>

          {/* Tamanho + cor */}
          <div className="flex items-center gap-2">
            <span className="flex h-8 min-w-[32px] items-center justify-center rounded-[4px] border border-[#e5e7eb] px-1 text-[13px] text-black">
              M
            </span>
            <span className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-black" />
          </div>

          {/* Quantidade + lixeira */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-[4px] border border-[#e5e7eb] px-3 py-1.5">
              <button
                type="button"
                className="text-[16px] leading-none text-black"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="min-w-[14px] text-center text-[14px] text-black">
                {qty}
              </span>
              <button
                type="button"
                className="text-[16px] leading-none text-black"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button type="button" className="text-[#fe4f30]">
              <TrashIcon size={20} />
            </button>
          </div>

          {/* Embalar para presente */}
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-black">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                giftWrap
                  ? "border-[#fe4f30] bg-[#fe4f30]"
                  : "border-[#d1d5db]"
              }`}
              onClick={() => setGiftWrap((v) => !v)}
            >
              {giftWrap && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5.5 4 7.5 8 3"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            Embalar para presente
          </label>
        </div>
      </div>

      {/* ── Entrega ──────────────────────────────────────────────── */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#6b7280]">Entrega</span>
          <span className="flex items-center gap-1.5 text-[14px] font-medium text-black">
            02729-060
            <button type="button" className="ml-1 text-[#9ca3af]">
              <CloseIcon size={14} />
            </button>
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[14px] text-[#6b7280]">
            Reserva Sp Higienopolis
          </span>
          <span className="text-[14px] font-medium text-[#16a34a]">
            Grátis
          </span>
        </div>
      </div>

      {/* ── Cupom e código do vendedor ───────────────────────────── */}
      <div className="bg-white px-4 py-4">
        <p className="mb-3 text-[14px] font-bold text-black">
          Cupom e código do vendedor
        </p>

        {/* Código do vendedor */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="shrink-0 text-[13px] text-[#6b7280]">
            Código do vendedor
          </span>
          <div className="flex items-center gap-2">
            <div className="flex h-8 items-center rounded-[6px] border border-[#e5e7eb] bg-[#f3f4f6] px-3 text-[13px] text-black">
              <input
                type="text"
                value={vendorCode}
                onChange={(e) => setVendorCode(e.target.value)}
                className="w-[80px] bg-transparent text-[13px] text-black outline-none"
              />
            </div>
            <button
              type="button"
              className="text-[13px] font-medium text-black"
            >
              Aplicar
            </button>
          </div>
        </div>

        {/* Cupom de desconto */}
        <div className="flex items-center justify-between gap-3">
          <span className="shrink-0 text-[13px] text-[#6b7280]">
            Cupom de desconto
          </span>
          <div className="flex items-center gap-2">
            <div className="flex h-8 items-center rounded-[6px] border border-[#e5e7eb] bg-[#f3f4f6] px-3">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-[80px] bg-transparent text-[13px] text-black outline-none"
              />
            </div>
            <button
              type="button"
              className="text-[13px] font-medium text-black"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>

      {/* ── Banner Prime ─────────────────────────────────────────── */}
      <div className="mx-0 bg-white px-4 py-1">
        <div className="rounded-xl border border-[#d4a827] bg-[#fffbeb] px-4 py-3">
          <p className="text-[13px] leading-[1.5] text-black">
            Cliente{" "}
            <span className="font-extrabold underline decoration-2">Prime</span>{" "}
            paga menos e tem frete grátis! Essa compra sai por apenas{" "}
            <span className="font-bold">R$ 509,15.</span>{" "}
            <span className="cursor-pointer font-bold underline">
              Assine agora
            </span>
          </p>
        </div>
      </div>

      {/* ── Resumo ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 bg-white px-4 py-4">
        <div className="flex justify-between text-[13px] text-[#9ca3af]">
          <span>Cashback gerado para próxima compra</span>
          <span className="shrink-0">R$ 59,90</span>
        </div>

        <div className="flex justify-between text-[14px]">
          <span className="text-[#6b7280]">Subtotal</span>
          <span className="font-bold text-black">R$ 599,00</span>
        </div>

        <Divider />

        <div className="flex justify-between text-[14px]">
          <span className="text-[#6b7280]">Total</span>
          <span className="font-bold text-black">R$ 599,00</span>
        </div>

        <CtaButton
          className="mt-3 !rounded-full !bg-[#16a34a]"
          icon={<ArrowRightIcon size={20} />}
          onClick={() => router.push("/checkout/loading")}
        >
          Ir para Checkout
        </CtaButton>
      </div>
    </div>
  );
}
