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
    <div className="flex min-h-screen flex-col px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      {/* Main content: top section + footer pushed to bottom */}
      <div className="flex flex-1 flex-col justify-between">
        {/* Top section */}
        <div className="mt-[42px] flex flex-col gap-[42px]">
          {/* Back + title + search */}
          <div className="flex flex-col gap-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[14px] font-semibold text-black"
            >
              <ArrowLeftCircleIcon size={22} className="text-black" />
              Voltar
            </button>

            <h1 className="text-[22px] font-bold text-ink-700">
              Lojas próximas
            </h1>

            <div className="flex flex-col gap-2">
              <div className="flex h-[46px] items-center justify-between rounded-[4px] bg-[#f3f4f6] px-3">
                <input
                  placeholder="Rua, cidade ou CEP"
                  className="flex-1 bg-transparent text-[16px] text-ink-600 outline-none placeholder:text-ink-600"
                />
                <SearchIcon size={20} className="text-ink-500" />
              </div>

              <button
                type="button"
                onClick={() => router.push("/checkout/trocar-loja")}
                className="flex items-center gap-2 text-[14px] text-ink-600"
              >
                <PinIcon size={20} className="text-ink-600" />
                <span className="underline">Usar minha localização</span>
              </button>
            </div>
          </div>

          <CtaButton disabled>Continuar</CtaButton>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <Footer showRecaptcha />
        </div>
      </div>
    </div>
  );
}
