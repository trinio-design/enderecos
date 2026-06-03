"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AddressBox from "../AddressBox";
import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import FreightCard from "../FreightCard";
import { ArrowLeftCircleIcon } from "../icons";

/**
 * Tela — Alterar frete (seleção do método de envio).
 */
export default function AlterarFrete() {
  const router = useRouter();
  const [freight, setFreight] = useState(1);

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

      <h1 className="text-[22px] font-bold text-ink-700">Alterar frete</h1>

      <AddressBox
        title="Endereço do envio"
        lines={["Rua Lauro Muller, 116 – piso 3 – Lj 331 –", "Botafogo, Rio de Janeiro"]}
        editHref="/checkout/alterar-endereco"
      />

      <div className="flex flex-col gap-3">
        <FreightCard
          name="Frete econômico"
          price="R$12,90"
          eta="Chegará até 18/09/26"
          selected={freight === 0}
          onSelect={() => setFreight(0)}
        />
        <FreightCard
          name="Frete expresso"
          price="R$22,90"
          eta="Chegará até 15/09/26"
          selected={freight === 1}
          onSelect={() => setFreight(1)}
        />
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
