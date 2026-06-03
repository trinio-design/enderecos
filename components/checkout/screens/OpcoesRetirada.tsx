"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AddressBox from "../AddressBox";
import CtaButton from "../CtaButton";
import Divider from "../Divider";
import Footer from "../Footer";
import Header from "../Header";
import PaymentSection from "../PaymentSection";
import PillButton from "../PillButton";
import SegmentToggle from "../SegmentToggle";
import StoreCard from "../StoreCard";
import { LockIcon, StoreIcon } from "../icons";

/**
 * Tela — Opções de retirada (toggle Envio/Retirada com lista de lojas).
 */
export default function OpcoesRetirada() {
  const router = useRouter();
  const [mode, setMode] = useState("retirada");
  const [store, setStore] = useState(0);

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <h1 className="text-[22px] font-bold text-ink-700">Revisar dados do pedido</h1>
      <div>
        <p className="text-[14px] font-medium text-black">victoria.scholte@gmail.com</p>
        <p className="text-[9px] text-ink-300">
          Não é você? <span className="font-bold underline">Sair</span>
        </p>
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-black">Opções de retirada</h2>
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

      <AddressBox
        title="Endereço de retirada"
        lines={["Rua Lauro Muller, 116 – piso 3 – Lj 331 –", "Botafogo, Rio de Janeiro"]}
        editHref="/checkout/trocar-loja"
      />

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

      <button
        type="button"
        onClick={() => router.push("/checkout/trocar-loja")}
        className="flex items-center justify-center gap-3 rounded-card bg-ink-100 py-3"
      >
        <StoreIcon size={18} className="text-black" />
        <span className="text-[12px] font-semibold text-black">Escolher outra loja</span>
      </button>

      <Divider />

      <PaymentSection />

      <CtaButton
        icon={<LockIcon size={24} />}
        onClick={() => router.push("/checkout/otp")}
      >
        Finalizar compra
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
