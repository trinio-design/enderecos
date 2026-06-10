"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Footer from "../Footer";
import Header from "../Header";
import SegmentToggle from "../SegmentToggle";
import StoreCard from "../StoreCard";
import { ArrowLeftCircleIcon, PinIcon, SearchIcon } from "../icons";

/**
 * Tela — Opções de retirada (toggle Envio/Retirada, busca por CEP, lista de lojas).
 */
export default function OpcoesRetirada() {
  const router = useRouter();
  const [mode, setMode] = useState("retirada");
  const [store, setStore] = useState(0);
  const [cep, setCep] = useState("CEP 34859-340");

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      {/* Voltar */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeftCircleIcon size={24} className="text-black" />
        <span className="text-[14px] font-semibold text-black">Voltar</span>
      </button>

      {/* Título + Toggle */}
      <div className="flex items-center justify-between gap-6">
        <h2 className="shrink-0 text-[16px] font-bold text-black">
          Opções de retirada
        </h2>
        <SegmentToggle
          options={[
            { key: "envio", label: "Envio" },
            { key: "retirada", label: "Retirada" },
          ]}
          value={mode}
          onChange={(key) =>
            key === "envio" ? router.push("/checkout/trocar-frete") : setMode(key)
          }
        />
      </div>

      {/* Busca por CEP */}
      <div className="flex flex-col gap-2">
        <label className="flex h-[46px] cursor-text items-center justify-between rounded bg-gray-100 px-3">
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="flex-1 bg-transparent text-[14px] font-medium text-black outline-none"
          />
          <SearchIcon size={20} className="shrink-0 text-black" />
        </label>

        <button
          type="button"
          className="flex items-center gap-2 self-start"
        >
          <PinIcon size={20} className="text-gray-700" />
          <span className="text-[14px] font-normal text-gray-700 underline underline-offset-2">
            Usar minha localização
          </span>
        </button>
      </div>

      {/* Cards de loja */}
      <div className="flex flex-col gap-3">
        <StoreCard
          name="Loja Rio Sul"
          address="Rua Lauro Muller, 116 – piso 3 – Lj 331 – Botafogo, Rio de Janeiro"
          distance="7 km"
          selected={store === 0}
          onSelect={() => setStore(0)}
        />
        <StoreCard
          name="Loja Rio Norte"
          address="Rua Laura Miller, 116 – piso 3 – Lj 331 – Palmas, São Paulo"
          distance="8 km"
          selected={store === 1}
          onSelect={() => setStore(1)}
        />
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => router.push("/checkout/otp")}
        className="flex h-12 w-full items-center justify-center rounded bg-black text-[16px] font-bold text-white"
      >
        Continuar
      </button>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
