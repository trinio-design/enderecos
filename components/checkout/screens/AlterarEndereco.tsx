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
    lines: ["Rua Senador Vergueiro, 232, 801,", "Flamengo Rio de Janeiro, 22261-100"],
  },
  {
    name: "Paula Scholte",
    lines: ["Rua Diógenes Sampaio, 36 – Casa", "22261-100 – Humaitá, Rio de Janeiro"],
  },
];

/**
 * Tela — Alterar endereço (lista de endereços salvos + adicionar novo).
 */
export default function AlterarEndereco() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 670,10" quantity={1} />

      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[14px] font-bold text-black"
      >
        <ArrowLeftCircleIcon size={22} className="text-black" />
        Voltar
      </button>

      <h1 className="text-[22px] font-bold text-ink-700">Alterar endereço</h1>

      <div className="flex flex-col gap-3">
        {ADDRESSES.map((addr, i) => {
          const active = selected === i;
          return (
            <button
              key={addr.name}
              type="button"
              onClick={() => setSelected(i)}
              className={`flex flex-col gap-3 rounded-card border bg-white p-4 text-left ${
                active ? "border-black" : "border-hairline"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {active ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-pill bg-success">
                      <CheckIcon size={11} className="text-white" />
                    </span>
                  ) : (
                    <span className="h-5 w-5 rounded-pill border border-ink-200" />
                  )}
                  <span className="text-[14px] font-bold text-black">{addr.name}</span>
                </div>
                <TrashIcon
                  size={20}
                  className={active ? "text-ink-200" : "text-black"}
                />
              </div>
              <div className="pl-8 text-[14px] leading-5 text-ink-500">
                {addr.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </button>
          );
        })}

        <button
          type="button"
          className="flex items-center justify-between rounded-card border border-hairline bg-white p-4"
        >
          <span className="text-[14px] font-medium text-black">Novo endereço</span>
          <ArrowRightIcon size={20} className="text-black" />
        </button>
      </div>

      <CtaButton onClick={() => router.push("/checkout/revisao-envio")}>
        Continuar
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
