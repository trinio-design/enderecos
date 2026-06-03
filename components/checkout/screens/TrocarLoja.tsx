"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import StoreCard from "../StoreCard";
import { ArrowLeftCircleIcon, PinIcon, SearchIcon } from "../icons";

const STORES = [
  {
    name: "Loja Rio Sul",
    address: "Rua Lauro Muller, 116 – piso 3 – Lj 331 – Botafogo, Rio de Janeiro",
    distance: "7 km",
    eta: "Retire em até 4h",
  },
  {
    name: "Ponto de retira – Villaboim",
    address: "Rua Lauro Muller, 116 – piso 3 – Lj 331 – Botafogo, Rio de Janeiro",
    distance: "5 km",
    eta: "Retire em até 4h",
  },
  {
    name: "Shopping Villa-Lobos",
    address: "Rua Lauro Muller, 116 – piso 3 – Lj 331 – Botafogo, Rio de Janeiro",
    distance: "8 km",
    eta: "Retire em até 1 dia",
  },
];

/**
 * Tela — Trocar loja (busca de lojas por CEP + lista de lojas próximas).
 */
export default function TrocarLoja() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[14px] font-bold text-black"
      >
        <ArrowLeftCircleIcon size={22} className="text-black" />
        Voltar
      </button>

      <h1 className="text-[22px] font-bold text-ink-700">Lojas próximas</h1>

      <div className="flex items-center gap-2 rounded-card bg-ink-100 px-4 py-3">
        <input
          defaultValue="CEP 34859-340"
          className="flex-1 bg-transparent text-[14px] text-black outline-none"
        />
        <SearchIcon size={20} className="text-ink-500" />
      </div>

      <button
        type="button"
        onClick={() => router.push("/checkout/busca-geolocalizacao")}
        className="flex items-center gap-2 text-[14px] text-black"
      >
        <PinIcon size={18} className="text-ink-400" />
        <span className="underline">Usar minha localização</span>
      </button>

      <div className="flex flex-col gap-3">
        {STORES.map((store, i) => (
          <StoreCard
            key={store.name}
            {...store}
            selected={selected === i}
            onSelect={() => setSelected(i)}
          />
        ))}
      </div>

      <CtaButton onClick={() => router.push("/checkout/revisao-retirada")}>
        Continuar
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
