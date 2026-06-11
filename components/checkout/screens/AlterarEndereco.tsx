"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import { ArrowLeftCircleIcon, ArrowRightIcon, CheckIcon, TrashIcon } from "../icons";

const ADDRESSES = [
  {
    name: "Victoria Scholte",
    lines: ["Rua João da Silva, 123 – Ap. 32", "Botafogo, Rio de Janeiro"],
  },
  {
    name: "Paula Scholte",
    lines: ["Rua Diógenes Sampaio, 36 – Casa", "22261-100 – Humaitá, Rio de Janeiro"],
  },
];

type Variant = "envio" | "cobranca";

/**
 * Tela — Alterar endereço (lista de endereços salvos + adicionar novo).
 * variant="envio"    → endereço de entrega  (node 4222-9761)
 * variant="cobranca" → endereço de cobrança (node 4261-3423)
 */
export default function AlterarEndereco({ variant = "envio" }: { variant?: Variant }) {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  const title =
    variant === "cobranca" ? "Alterar endereço de cobrança" : "Alterar endereço";

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 670,10" quantity={3} />

      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[14px] font-semibold text-black"
      >
        <ArrowLeftCircleIcon size={22} className="text-black" />
        Voltar
      </button>

      <h1 className="text-[16px] font-bold text-black">{title}</h1>

      <div className="flex flex-col gap-3">
        {ADDRESSES.map((addr, i) => {
          const active = selected === i;
          return (
            <button
              key={addr.name}
              type="button"
              onClick={() => setSelected(i)}
              className={`flex flex-col gap-3 rounded-lg border bg-white p-4 text-left ${
                active ? "border-black" : "border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {active ? (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#38b74c]">
                      <CheckIcon size={8} className="text-white" />
                    </span>
                  ) : (
                    <span className="h-4 w-4 shrink-0 rounded-full border border-black/16" />
                  )}
                  <span className="text-[14px] font-semibold leading-[18px] text-black">
                    {addr.name}
                  </span>
                </div>
                <TrashIcon size={20} className="text-neutral-400" />
              </div>
              <div className="pl-7 text-[14px] leading-[18px] text-black">
                {addr.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </button>
          );
        })}

        <button
          type="button"
          className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4"
        >
          <span className="text-[14px] font-semibold leading-5 text-black">
            Novo endereço
          </span>
          <ArrowRightIcon size={20} className="text-black" />
        </button>
      </div>

      <CtaButton
        onClick={() =>
          router.push(
            variant === "cobranca"
              ? "/checkout/revisao-retirada"
              : "/checkout/revisao-envio"
          )
        }
      >
        Continuar
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
