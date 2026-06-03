"use client";

import { useRouter } from "next/navigation";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import { ArrowLeftCircleIcon, PinIcon, SearchIcon } from "../icons";

/**
 * Tela — Busca por geolocalização (estado inicial da busca de lojas).
 */
export default function BuscaGeolocalizacao() {
  const router = useRouter();

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
          placeholder="Rua, cidade ou CEP"
          className="flex-1 bg-transparent text-[14px] text-ink-400 outline-none placeholder:text-ink-400"
        />
        <SearchIcon size={20} className="text-ink-500" />
      </div>

      <button
        type="button"
        onClick={() => router.push("/checkout/trocar-loja")}
        className="flex items-center gap-2 text-[14px] text-black"
      >
        <PinIcon size={18} className="text-ink-400" />
        <span className="underline">Usar minha localização</span>
      </button>

      <CtaButton disabled>Continuar</CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
